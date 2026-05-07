import React, { useState } from "react"
import BookViewer from "./BookViewer"
import "./App.css"

function App() {
    const [panelOpen, setPanelOpen] = useState(false)

    return (
        <div className="scene">
            <BookViewer shifted={panelOpen} />     {/* when panelOpen is true, BookViewer receives shifted={true} and slides over */}

            {/* side panel (left?) */}
            <div className={`side-panel ${panelOpen ? 'open' : ''}`}>       {/* if panelOpen is true, add the class 'open', otherwise add nothing */}
                <button onClick={() => setPanelOpen(false)}>X Close</button>
                <h3>Dictionary</h3>
                <p>customize this ltr</p>
            </div>

            {/* button to open panel */}
            {!panelOpen && (
                <button className="open-btn" onClick={() => setPanelOpen(true)}>
                    Open Dictionary
                </button>
            )}
        </div>
    )
}

export default App