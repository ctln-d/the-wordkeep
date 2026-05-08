import React, {useEffect, useState} from "react"

function SearchBar({ onWordFound }) {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState(null)
    const [error, setError] = useState(null)

    const searchWord = async () => {
        // return nothing
        if (!input) return

        try {
            const response = await fetch(`http://localhost:3001/define?word=${input}`)
            const data = await response.json()

            if (data.type === "definition") {
                setOutput(data)
                setError(null)
                onWordFound(data)
            } else {
                setOutput(null)
                setError("No definition found.")
                onWordFound(null)
            }
        } catch (err) {
            setError("Something went wrong.")
        }
    }

    return (
        <div>
            <div className="search">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchWord()}
                />
            </div>

            {output && (
                <div className="search-output">
                    <h2 className="word-text-panel">{output.word}</h2>
                    <p className="word-part-of-speech">{output.partOfSpeech}</p>
                    {/* ordered list */}
                    <ol>
                        {output.definitions.map((def, index) => (
                            <li key={index}>{def}</li>
                            ))}
                    </ol>
                </div>
            )}
        </div>
    )
}


export default SearchBar