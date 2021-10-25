import React, { useState } from "react";
import EditorJs from "react-editor-js";
import { API, BlockAPI, OutputData} from "@editorjs/editorjs"

export const Editor = ({state, setState}) => {
  return (
    <div>
      <EditorJs onChange={(_api:API, data) => {   
          setState(data.blocks)
      }}/>
    </div>
  );
};

export default Editor;