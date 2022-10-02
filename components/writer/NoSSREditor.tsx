import React, { useState } from "react";
import EditorJsWrapper from "./editorWrapper";

export const Editor = ({data, setState }) => {
  return (
     <div>
      <EditorJsWrapper  

      config= {{
        onChange: async (api, event) => {
          const state = await api.saver.save()
          setState(state.blocks)
        },
        
        data: {
          blocks: data
        },
        placeholder: "Start typing here...",

      }}

      />
    </div>

  );
};

export default Editor;