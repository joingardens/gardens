import { EditorConfig } from "@editorjs/editorjs";
import React from "react";

interface EditorJsWrapperProps extends React.ComponentProps<"div"> {
  config?: EditorConfig;
}

export default function EditorJsWrapper({
  config = {},
  ...restProps
}: EditorJsWrapperProps): JSX.Element {
  const elmtRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (!elmtRef.current) {
      return;
    }

    let editorJs;

    (async () => {

      const { default: EditorJS } = await import("@editorjs/editorjs");
      const { default: embed } = await import('@editorjs/embed')
      const { default: table } = await import("@editorjs/table")
      const { default: header } = await import('@editorjs/header')
      const { default: checklist } = await import('@editorjs/checklist')
      const { default: marker } = await import('@editorjs/marker')
      const { default: delimiter } = await import('@editorjs/delimiter')
      const { default: inlineCode } = await import('@editorjs/inline-code')
      const { default: simpleImage } = await import('@editorjs/simple-image')
      //const { default: warning } = await import ("@editorjs/warning")
      //const { default: code } = await import("@editorjs/code")
      //const { default: quote } = await import("@editorjs/quote")

      editorJs = new EditorJS({
        ...config,
        tools: {
          embed,
          table,
          header,
          checklist,
          marker,
          delimiter,
          inlineCode,
          simpleImage,
          //warning,
          //quote,
          //code,
        },
        holder: elmtRef.current,
      });

    })().catch((error): void => console.error(error));

    return (): void => {
      editorJs.destroy();
    };
  }, []);

  return (
    <div
    {...restProps}
    ref={(elmt): void => {
      elmtRef.current = elmt;
    }}
    />
  );
}