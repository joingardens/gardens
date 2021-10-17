const ImageInput = ({setState, state}) => {
    return (
        <label>
            <div className={`rounded-lg m-2 border grid place-items-center cursor-pointer bg-gray-50 w-32 h-20`}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M5 11.1l2-2 5.5 5.5 3.5-3.5 3 3V5H5v6.1zM4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm11.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
        fill="rgba(149,164,166,1)"
      />
    </svg>
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