import React, {useEffect, useState} from "react"

function SearchBar() {
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
            } else {
                setOutput(null)
                setError("No definition found.")
            }
        } catch (err) {
            setError("Something went wrong.")
        }
    }

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchWord()}
                />
                <button onClick={searchWord}>search</button>
            </div>

            {output && (
                <div className="search-output">
                    <h2>{output.word}</h2>
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