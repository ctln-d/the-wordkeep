import React, { useState, useEffect } from "react";
import BookViewer from "./BookViewer";
import "./Main.css";
import SearchBar from "./SearchBar";
import basePages from "./pages";

function Main() {
    const [panelLeftOpen, setPanelLeftOpen] = useState(false);
    const [panelRightOpen, setPanelRightOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    const [pages, setPages] = useState(basePages);
    const [foundWord, setFoundWord] = useState(null);
    const [source, setSource] = useState("");
    const [notes, setNotes] = useState("");
    const [saveStatus, setSaveStatus] = useState("");

    const bookHeight = Math.min(window.innerHeight * 0.85, 743);
    const bookWidth = bookHeight * (542 / 743);
    const scale = bookHeight / 743;

    // existing pages by user
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log("USER ID:", userId);
        if(!userId) return;

        fetch(`/pages/getPages?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "SUCCESS" && Array.isArray(data.pages)) {
                    if (data.pages.length > 0) {
                        setPages([...data.pages]);
                    } else {
                        setPages(basePages);
                    }
                }
            })
            .catch(err => console.log(err));
    }, []);

    // autosave word inputs
    useEffect(() => {
        if (!selectedWord) return;

        if (
            source === (selectedWord.userInputs?.source || "") &&
            notes === (selectedWord.userInputs?.notes || "")
        ) {
            return;
        }

        const timeoutId = setTimeout(() => {
            const userId = localStorage.getItem("userId");

            fetch("/pages/savePages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    wordId: selectedWord.id,
                    source,
                    notes
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.status === "SUCCESS") {
                        setPages(prev =>
                            prev.map(page=> ({
                                ...page,
                                words: page.words.map(word =>
                                    word.id === selectedWord.id
                                        ? {
                                            ...word,
                                            userInputs: {
                                                ...word.userInputs,
                                                source,
                                                notes
                                            }
                                        }
                                        : word
                                )
                            }))
                        );

                        setSaveStatus("saved.");
                        setTimeout(() => {
                            setSaveStatus("");
                        }, 2000);
                    }
                }).catch(err => {
                    console.log(err);
                    setSaveStatus("failed to save.")
                });
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [source, notes]);

    // runs when a word is clicked
    // recieves word object
    function handleWordClick(wordObj) {
        setSelectedWord(wordObj);  // save clicked word
        setPanelRightOpen(true);
        setPanelLeftOpen(false);

        setSource(wordObj.userInputs?.source || "");
        setNotes(wordObj.userInputs?.notes || "");
    }

    function handleRightClose() {
        setPanelRightOpen(false);
        setSelectedWord(null);    // clear word when panel closes
    }

    function handleSourceChange(e) {
        setSource(e.target.value);
        setSaveStatus("saving...");
    }

    function handleNotesChange(e) {
        setNotes(e.target.value);
        setSaveStatus("saving...");
    }

    function wordExists(word) {
        return pages.some(page =>
            page.words.some(w => w.word === word)
        );
    }

    function handleAddWord(output) {
        setFoundWord(output);
    }

    function addWord() {
        if (!foundWord) return;

        if (wordExists(foundWord.word)) {
            // add alert msg
            return;
        }

        const newWord = {
            id: foundWord.id,
            word: foundWord.word,
            partOfSpeech: foundWord.partOfSpeech,
            definitions: foundWord.definitions,
            userInputs: {
                source: "",
                notes: ""
            }
        };

        const newPages = [...pages];
        if (newPages.length === 0) {
            newPages.push(
                { id: 1, words: [] },
                { id: 2, words: [] }
            );
        }
        const lastFullPage = newPages[newPages.length - 2];  // second to last
        const lastPage = newPages[newPages.length - 1];

        if (lastFullPage.words.length < 13) {
            lastFullPage.words = [...lastFullPage.words, newWord];
        } else if (lastPage.words.length < 13) {
            lastPage.words = [...lastPage.words, newWord];
        } else {
            newPages.push({
                id: newPages.length + 1,
                words: [newWord]
            });
            // second page for ui
            newPages.push({
                id: newPages.length + 1,
                words: []
            });
        }
        setPages(newPages);

        const userId = localStorage.getItem("userId");

        fetch("/pages/savePages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                pages: newPages
            })
        }).then(res => res.json())
            .then(data => {
                if (data.status === "SUCCESS" && Array.isArray(data.pages)) {
                    setPages([...data.pages]);
                }
            })
            .catch(err => console.log(err));
    }

    function saveWord() {
        if (!selectedWord) return;

        const userId = localStorage.getItem("userId");

        fetch("/pages/savePages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                wordId: selectedWord.id,
                source,
                notes
            })
        }).then(res => res.json())
            .then(data => {
                if (data.status === "SUCCESS") {
                    setPages(prev =>
                        prev.map(page => ({
                            ...page,
                            words: page.words.map(word =>
                                word.id === selectedWord.id
                                    ? {
                                        ...word,
                                        userInputs: {
                                            ...word.userInputs,
                                            source,
                                            notes
                                        }
                                    }
                                    :word
                            )
                        }))
                    );
                }
            })
            .catch(err => console.log(err));
    }

    function deleteWord() {
        if (!selectedWord) return;

        const allWords = (pages || []).flatMap(page => page.words);

        const remainingWords = allWords.filter(
            word => word.id !== selectedWord.id
        );

        const updatedPages = repackPages(remainingWords);

        setPages(updatedPages);

        const userId = localStorage.getItem("userId");

        fetch("/pages/savePages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                pages: updatedPages
            })
        }).then(res => res.json())
            .then(data => {
                if (Array.isArray(data.pages)) {
                    setPages(data.pages);
                }
            })
            .catch(err => console.log(err));

        handleRightClose();
    }

    function repackPages(words) {
        const newPages = [];

        for (let i = 0; i < words.length; i += 13) {
            newPages.push({
                id: newPages.length + 1,
                words: words.slice(i, i + 13)
            });
        }

        if (newPages.length === 0) {
            newPages.push(
                { id: 1, words: [] },
                { id: 2, words: [] }
            );
        } else if (newPages.length % 2 !== 0) {
            newPages.push({
                id: newPages.length + 1,
                words: []
            });
        }

        return newPages;
    }

    return (
        <div className="scene">
            {/* button to open left panel */}
            {!panelLeftOpen && (
                <button className="open-dic-btn" onClick={() => {
                    setPanelLeftOpen(true);
                    setPanelRightOpen(false)}}>
                    dictionary
                </button>
            )}

            {/* left panel */}
            <div className={`left-panel ${panelLeftOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setPanelLeftOpen(false)}>X</button>
                <SearchBar onWordFound={handleAddWord}/>

                {/* show or hide */}
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "auto"}}>
                    <button className="main-btn" onClick={addWord}>add</button>
                </div>
            </div>

            <BookViewer
                shiftedRight={panelRightOpen}
                shiftedLeft={panelLeftOpen}
                onWordClick={handleWordClick}
                pages={pages}
                bookWidth={bookWidth}
                bookHeight={bookHeight}
                scale={scale}
            /> {/* when panelOpen is true, BookViewer receives shiftedRight={true} and slides over */}

            {/* right panel */}
            <div className={`right-panel ${panelRightOpen ? 'open' : ''}`}>       {/* if panelOpen is true, add the css class 'open', otherwise add nothing */}
                <button className="close-btn" onClick={handleRightClose}>X</button>

                {/* if multiple vs if one definition */}
                {selectedWord && (
                    <div className="word-info">
                        {/* inline (takes up as much width as necessary */}
                        <h2 className="word-text-panel">{selectedWord.word}</h2>
                        <span className="word-part-of-speech">{selectedWord.partOfSpeech}</span>
                        <div className="word-definition">
                            {selectedWord.definitions.length > 1 ? (
                                <ol>
                                    {selectedWord.definitions.map((def, index) => (
                                        <li key={index}>{def}</li>
                                    ))}
                                </ol>
                            ) : (
                                <p>{selectedWord.definitions[0]}</p>
                            )}
                        </div>
                        <div className="word-inputs">
                            {saveStatus && (
                                <div className="save-status">
                                    {saveStatus}
                                </div>
                            )}
                            <input
                                type="text"
                                value={source}
                                onChange={handleSourceChange}
                                placeholder="source (e.g. book, film, song)"
                                className="word-input"
                                id="source-input"
                            />
                            <textarea
                                value={notes}
                                onChange={handleNotesChange}
                                placeholder="notes (e.g. something to associate the word with)"
                                className="word-input"
                                id="notes-input"
                            />
                            <button className="delete-btn" onClick={deleteWord}>delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main;