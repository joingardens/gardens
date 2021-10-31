import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { OutputBlockData } from '@editorjs/editorjs';
import Writer from '../components/writer/writerService';
import { useUser } from '../utils/useUser';
import useAutosave from '../components/writer/useEditorAutosave';

export const EditorJsWithNoSSR = dynamic(() => import("../components/writer/NoSSREditor"), {
    ssr: false,
  });
  

const TestEditor = () => {

    const [editorState, setEditorState] = useState([])
    const [fetchedData, setFetchedData] = useState([])
    const {user} = useUser()

    return (
        <>
        {/* <h2>
        Инпут
        </h2>
        <div className={`p-6 border-red-600 border-2`}>
             <EditorJsWithNoSSR data={editorState} setState={setEditorState}/>
        </div>
        <h2>
        Аутпут
        </h2>
        <div className={`p-6 border-blue-600 border-2`}>
            {editorState.map((block: OutputBlockData) => {
                return Writer.transformBlockData(block)
            })}
        </div>
        <h2>
            Загруженное
        </h2>
        <div className={`p-6 border-green-600 border-2`}>
            {fetchedData.map((block: OutputBlockData) => {
                return Writer.transformBlockData(block)
            })}
        </div>
        <button onClick={() => {
            Writer.insertDraft(editorState, user.id, "test")
        }}>
            Save
        </button>
        <button className={`ml-3`} onClick={async () => {
           const data = await Writer.getDraftbyId(3)
           setFetchedData(data.payload)
        }}>
            Fetch
        </button> */}
        </>
    )
}   

export default TestEditor