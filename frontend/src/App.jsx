import React, { useState } from "react"
import BookViewer from "./BookViewer"
import "./App.css"
import SearchBar from "./SearchBar";
import basePages from "./pages";
import pages from "./pages";

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
            type: foundWord.partOfSpeech,
            definition: foundWord.definitions[0]    // first def?
        }

        const newPages = [...pages]
        const lastPage = newPages[newPages.length - 1]

        if (newPages[newPages.length - 1]) {
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
            /> {/* when panelOpen is true, BookViewer receives shiftedRight={true} and slides over */}

            {/* side panel (right?) */}
            <div className={`right-panel ${panelRightOpen ? 'open' : ''}`}>       {/* if panelOpen is true, add the css class 'open', otherwise add nothing */}
                <button className="close-btn" onClick={handleRightClose}>X</button>

                {selectedWord && (
                    <div className="word-info">
                        {/* inline (takes up as much width as necessary */}
                        <span className="word-type">{selectedWord.type}</span>
                        <h2 className="word-title">{selectedWord.word}</h2>
                        {/*
                        <ol>
                            {selectedWord.definitions.map((def, index) => (
                                <li key={index}>{def}</li>
                            ))}
                        </ol>
                        */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App


