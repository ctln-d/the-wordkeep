import React, { useState } from "react"
import BookViewer from "./BookViewer"
import "./App.css"

function App() {
    const [panelLeftOpen, setPanelLeftOpen] = useState(false)
    const [panelRightOpen, setPanelRightOpen] = useState(false)
    const [selectedWord, setSelectedWord] = useState(null)

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

    return (
        <div className="scene">
            <BookViewer
                shiftedRight={panelRightOpen}
                shiftedLeft={panelLeftOpen}
                onWordClick={handleWordClick}
            /> {/* when panelOpen is true, BookViewer receives shiftedRight={true} and slides over */}

            {/* button to open left panel */}
            {!panelLeftOpen && (
                <button className="open-dic-btn" onClick={() => setPanelLeftOpen(true)}>
                    dictionary
                </button>
            )}

            {/* left panel */}
            <div className={`left-panel ${panelLeftOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setPanelLeftOpen(false)}>X</button>
                <h3>Dictionary</h3>
            </div>

            {/* side panel (right?) */}
            <div className={`right-panel ${panelRightOpen ? 'open' : ''}`}>       {/* if panelOpen is true, add the css class 'open', otherwise add nothing */}
                <button className="close-btn" onClick={handleRightClose}>X</button>

                {selectedWord && (
                    <div className="word-info">
                        {/* inline (takes up as much width as necessary */}
                        <span className="word-type">{selectedWord.type}</span>
                        <h2 className="word-title">{selectedWord.word}</h2>
                        <p className="word-definition">{selectedWord.definition}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App