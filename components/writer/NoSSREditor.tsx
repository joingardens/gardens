import React, { useState } from "react";
import EditorJs from "react-editor-js";
import { API, BlockAPI, OutputBlockData, OutputData} from "@editorjs/editorjs"

export const Editor = ({data, setState}) => {


  return (
    <div>
      <EditorJs  
      data={{
        blocks: data
      }}
      onChange={(api, data) => {
        //console.log(data.blocks)
        setState(data.blocks)
      }}
      placeholder="Start typing here..."
      //tools={tools}
      />
    </div>
  );
};

export default Editor;