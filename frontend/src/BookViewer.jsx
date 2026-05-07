import React, { useRef } from "react"
import HTMLFlipBook from "react-pageflip"
import pages from "./pages.js"

const Page = React.forwardRef(({ text }, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="pg-content">
                <p>{text}</p>
            </div>
        </div>
    )
})

function BookViewer({ shifted }) {
    const book = useRef()

    return (
        <div className={`book-wrapper ${shifted ? 'shifted' : ''}`}>
            <HTMLFlipBook
                className=""
                style={{}}
                startPage={1}
                size="fixed"
                width={542}
                height={743}
                minWidth={542}
                maxWidth={542}
                minHeight={743}
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
                disableFlipByClick={true}  //test true
                children={null}
                ref={book}
            >
                {pages.map(page => (
                    <Page key={page.id} text={page.text} />
                ))
                }
            </HTMLFlipBook>
        </div>
    )
}

export default BookViewer