import React, { useState } from "react";
import EditorJsWrapper from "./editorWrapper";



export const ReadOnlyEditor = ({data}) => {

  return (
    <div>
      <EditorJsWrapper
      config= {{
        data: {
          blocks: data
        },
        readOnly: true,
      }}
      />
    </div>
  );
};

export default ReadOnlyEditor;