import React, { useState } from "react"

function SearchBar({ onWordFound }) {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState(null)
    const [error, setError] = useState(null)

    const searchWord = async () => {
        // return nothing
        if (!input) return

        try {
            const response = await fetch(`/define?word=${input}`)
            const data = await response.json()
            console.log(data)

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
            console.log(err)
        }
    }

    return (
        <div>
            <div className="search">
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "auto"}}>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchWord()}
                    />
                </div>
            </div>

            {error && <p className="search-error">{error}</p>}

            {output && (
                <div className="search-output">
                    <h2 className="word-text-panel">{output.word}</h2>
                    <p className="word-part-of-speech">{output.partOfSpeech}</p>
                    {output.definitions.length > 1 ? (
                        <ol>
                            {output.definitions.map((def, index) => (
                                <li key={index}>{def}</li>
                            ))}
                        </ol>
                    ) : (
                        <p>{output.definitions[0]}</p>
                    )}
                </div>
            )}
        </div>
    )
}


export default SearchBar