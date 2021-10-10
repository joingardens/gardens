const ImageInput = ({setState, state}) => {
    return (
        <label>
            <div className={`rounded-lg m-2 border-2 grid place-items-center border-gray-400 cursor-pointer bg-gray-200 w-36 h-20`}>
                Insert image
            </div>
            <input 
            type={"file"}
            multiple 
            hidden 
            accept="image/*"
            onChange={(e) => {
                
                setState([...state, ...Array.from(e.target.files)])
            }}
            />
        </label>
    )
}

export default ImageInput