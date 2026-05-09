import React, { useRef } from "react"
import HTMLFlipBook from "react-pageflip"
import basePages from "./pages.js"

// move over a bit so page corners won't be in the way
function WordRow({ wordObj, onWordClick }) {
    if (wordObj.partOfSpeech === "noun") {
        wordObj.partOfSpeech = "n."
    } else if (wordObj.partOfSpeech === "verb") {
        wordObj.partOfSpeech = "v."
    } else if (wordObj.partOfSpeech === "adverb") {
        wordObj.partOfSpeech = "adv."
    } else if (wordObj.partOfSpeech === "adjective") {
        wordObj.partOfSpeech = "adj."
    } else if (wordObj.partOfSpeech === "conjunction") {
        wordObj.partOfSpeech = "conj."
    } else if (wordObj.partOfSpeech === "preposition") {
        wordObj.partOfSpeech = "prep."
    } else if (wordObj.partOfSpeech === "pronoun") {
        wordObj.partOfSpeech = "pron."
    } else if (wordObj.partOfSpeech === "interjection") {
        wordObj.partOfSpeech = "interj."
    } else if (wordObj.partOfSpeech === "imperative verb") {
        wordObj.partOfSpeech = "imp."
    }

    return (
        <div className="word-row" onClick={() => onWordClick(wordObj)}>
            <span className="word-text">{wordObj.word}</span>
            <span className="word-part-of-speech">{wordObj.partOfSpeech}</span>
        </div>
    )
}

const Page = React.forwardRef(({ words, onWordClick }, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="pg-content">
                {words.map((wordObj, index) => (
                    <WordRow
                        key={index}
                        wordObj={wordObj}
                        onWordClick={onWordClick}
                    />
                ))}
            </div>
        </div>
    )
})

function BookViewer({ shiftedLeft, shiftedRight, onWordClick, pages, bookHeight, bookWidth, scale }) {
    const book = useRef()

    return (
        <div className={`book-wrapper ${shiftedLeft ? 'shiftedLeft' : ''} ${shiftedRight ? 'shiftedRight' : ''}`}>
            <HTMLFlipBook
                className=""
                style={{}}
                startPage={1}
                size="fixed"
                width={bookWidth}
                height={bookHeight}
                minWidth={bookWidth}
                maxWidth={bookWidth}
                minHeight={bookHeight}
                maxHeight={bookHeight}
                drawShadow={true}
                flippingTime={700}
                usePortrait={false}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={true}
                ref={book}
            >
                {pages.map(page => (
                    <Page
                        key={page.id}
                        words={page.words}
                        partOfSpeech={page.partOfSpeech}
                        onWordClick={onWordClick}
                        scale={scale}
                    />
                ))
                }
            </HTMLFlipBook>
        </div>
    )
}

export default BookViewer