import React, { useRef } from "react"
import HTMLFlipBook from "react-pageflip"
import pages from "./pages.js"

// move over a bit so page corners won't be in the way
function WordRow({ wordObj, onWordClick }) {
    return (
        <div className="word-row" onClick={() => onWordClick(wordObj)}>
            <span className="word-text">{wordObj.word}</span>
            <span className="word-type">{wordObj.type}</span>
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

function BookViewer({ shiftedLeft, shiftedRight, onWordClick, pages }) {
    const book = useRef()

    return (
        <div className={`book-wrapper ${shiftedLeft ? 'shiftedLeft' : ''} ${shiftedRight ? 'shiftedRight' : ''}`}>
            <HTMLFlipBook
                className=""
                style={{}}
                startPage={1}
                size="fixed"
                width={542}
                height={743}
                minWidth={1}
                maxWidth={542}
                minHeight={1}
                maxHeight={743}
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
                        onWordClick={onWordClick}
                    />
                ))
                }
            </HTMLFlipBook>
        </div>
    )
}

export default BookViewer