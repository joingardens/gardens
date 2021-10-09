import Image from 'next/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';


const ScaleableImage = ({imageDomain, imageURL}) => {

    const [isEnlarged, setIsEnlarged] = useState(0)
    const ref = useRef(null) as MutableRefObject<HTMLImageElement>
    useEffect(() => {
        if (isEnlarged) {

        }
        else {

        }
    }, [isEnlarged])
    return (
        <div 
        style={{
            height: isEnlarged ? `${isEnlarged}px` : ""
        }}
        className="h-48 transition-all duration-500 w-11/12 relative mt-4">
        <Image 

        className={`w-full cursor-pointer`}
        src={'https://' + imageDomain + '/storage/v1/object/public/' + imageURL} 
        layout='fill'
        objectFit='contain'

        onClick={(e) => {
            if (isEnlarged) {
                setIsEnlarged(0)
            }
            else {
                setIsEnlarged(e.currentTarget.naturalHeight * 1)
            }
        }}
         />
    </div>
    )
    }

export default ScaleableImage