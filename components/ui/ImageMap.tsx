import { Dispatch, SetStateAction } from "react"
import Cross from "../icons/Cross"


const ImageMap = ({images, setState}:{images: File[], setState:Dispatch<SetStateAction<File[]>>}) => {
    const links = Array.from(images).map((a) => {
        return URL.createObjectURL(a)
    })
    return (
        <div className={`flex flex-wrap`}>
        {links.map((link, i) => {
           return <div 
            style={{
                backgroundImage: `url(${link})`
            }}
            className={`rounded-lg m-2 bg-center border-2 grid place-items-center border-gray-400 w-32 h-20 relative`}>
                <div 
                onClick={(e) => {setState(images.filter((a, k) => k !== i))}}
                className={`absolute top-1 right-1 cursor-pointer w-8 h-8 text-red-600 bg-gray-300 rounded-lg p-1 bg-opacity-50`}>
                    <Cross/>
                </div>
            </div>
        })}
        </div>
    )
}

export default ImageMap