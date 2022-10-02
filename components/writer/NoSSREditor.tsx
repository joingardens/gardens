import React, { useState } from "react";
import EditorJsWrapper from "./editorWrapper";

export const Editor = ({data, setState }) => {
  return (
     <div>
      <EditorJsWrapper  

      config= {{
        onChange: async (api, event) => {
          console.log('Now I know that Editor\'s content changed!', )
          const state = await api.saver.save()
          console.log(state)
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