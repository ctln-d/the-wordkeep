import React, { useState } from "react"
import BookViewer from "./BookViewer"
import "./App.css"
import SearchBar from "./SearchBar";
import basePages from "./pages";

function App(props) {
    const [panelLeftOpen, setPanelLeftOpen] = useState(false)
    const [panelRightOpen, setPanelRightOpen] = useState(false)
    const [selectedWord, setSelectedWord] = useState(null)
    const [pages, setPages] = useState(basePages)
    const [foundWord, setFoundWord] = useState(null)

    // runs when a word is clicked
    // recieves word object
    function handleWordClick(wordObj) {
        setSelectedWord(wordObj)    // save clicked word
        setPanelRightOpen(true)
    }

    function handleRightClose() {
        setPanelRightOpen(false)
        setSelectedWord(null)    // clear word when panel closes
    }

    function handleAddWord(output) {
        setFoundWord(output)
    }

    function addWord() {
        if (!foundWord) return

        const newWord = {
            word: foundWord.word,
            partOfSpeech: foundWord.partOfSpeech,
            definitions: foundWord.definitions
        }

        const newPages = [...pages]
        const lastPage = newPages[newPages.length - 1]

        if (lastPage.words.length < 13) {
            lastPage.words = [...lastPage.words, newWord]
        } else {
            newPages.push({
                id: newPages.length + 1,
                words: [newWord]
            })
        }
        setPages(newPages)
    }

    return (
        <div className="scene">
            {/* button to open left panel */}
            {!panelLeftOpen && (
                <button className="open-dic-btn" onClick={() => setPanelLeftOpen(true)}>
                    dictionary
                </button>
            )}

            {/* left panel */}
            <div className={`left-panel ${panelLeftOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setPanelLeftOpen(false)}>X</button>
                <SearchBar onWordFound={handleAddWord}/>

                {/* show or hide */}
                <button className="add-btn" onClick={addWord}>add</button>
            </div>

            <BookViewer
                shiftedRight={panelRightOpen}
                shiftedLeft={panelLeftOpen}
                onWordClick={handleWordClick}
                pages={pages}
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
                )}
            </div>
        </div>
    )
}

export default App





