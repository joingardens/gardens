import Image from 'next/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Cross from './icons/Cross';

const ScaleableImage = ({imageDomain, imageURL}) => {

    const [isEnlarged, setIsEnlarged] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [scrollState, setScrollaState] = useState({
        scrollLeft: 0, 
        scrollTop: 0,
    })
    const [clientState, setClientState] = useState({
        clientX: 0,
        clientY:0
    })
    const [dims, setDims] = useState({
        width: 1,
        height: 1
    })
    const scroller = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        const body = document.querySelector("body")
        if (isEnlarged) {
            body.style.overflow="hidden"
            return
        }
        body.style.overflow=""
    }, [isEnlarged])

    useEffect(() => {

        const dragListener = (e:MouseEvent) => {
            console.log()
            scroller.current.scrollLeft = scrollState.scrollLeft + clientState.clientX - e.clientX
            scroller.current.scrollTop = scrollState.scrollTop + clientState.clientY - e.clientY
        }
        const mouseUpListener = () => {
            setClientState({
                clientX:0,
                clientY: 0
            })
            setScrollaState({
                scrollLeft: 0,
                scrollTop: 0
            })
            setIsDragging(false)
        }
        if (isDragging) {
            window.addEventListener('mousemove', dragListener);
            window.addEventListener('mouseup', mouseUpListener);
          }

          return () => {
            window.removeEventListener('mousemove', dragListener);
            window.removeEventListener("mouseup", mouseUpListener)
          }
    },[isDragging])
    const ref = useRef(null) as MutableRefObject<HTMLImageElement>
    const src = 'https://' + imageDomain + '/storage/v1/object/public/' + imageURL
    return (
    <>
        <div 
            className=" transition-all duration-500 w-11/12 relative mt-4 grid place-items-center">
            <img src={src} className={`cursor-pointer`} alt="" onClick={(e) => {
                setIsEnlarged(!isEnlarged)
                setDims({
                    width: e.currentTarget.naturalWidth,
                    height: e.currentTarget.naturalHeight
                })
            }} />
        </div>
        <div 
        ref={scroller}
        className={`fixed ${isEnlarged ? "opacity-100 visible" : "opacity-30 invisible"} w-full transition-all duration-500 bg-black bg-opacity-30 z-50 max-w-full min-h-full left-0 top-0 grid place-items-center overflow-x-auto px-5 py-5 `}>
            <img 
            style={{
                minWidth: dims.width
            }}
            onClick={(e) => {
            }}
            onMouseDown={(e) => {
                setIsDragging(true)
                setClientState({
                    clientX: e.clientX,
                    clientY: e.clientY
                })
                setScrollaState({
                    scrollLeft: scroller.current.scrollLeft,
                    scrollTop: scroller.current.scrollTop
                })
            }}
            onMouseUp={(e) => {
                setIsDragging(false)
            }}
            draggable={false}
            width={dims.width}
            height={dims.height}
            src={src} 
            alt="" />
            <div 
            onClick={() => {
                setIsEnlarged(false)
            }}
            className={`fixed text-white top-10 right-10 bg-black rounded-md cursor-pointer bg-opacity-60 p-2 `}>
                <Cross/>
            </div>
        </div>
    </>
    )
    }

export default ScaleableImage