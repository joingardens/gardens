import React, { useState } from "react";
import EditorJs from "react-editor-js";
import { API, BlockAPI, OutputBlockData, OutputData} from "@editorjs/editorjs"

export const ReadOnlyEditor = ({data, tools, className}) => {

  return (
    <div>
      <EditorJs  
      data={{
        blocks: data
      }}
      readOnly={true}
      tools={tools}
      />
    </div>
  );
};

export default ReadOnlyEditor;