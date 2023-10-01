import React from 'react'
import Editor from "@monaco-editor/react";
import Language from '@/types/Language';
import languageMapper from '@/helpers/languageMapper'
import Theme from '@/types/Theme';

interface IEditorPane  {
  code: string,
  setCode: any,
  theme: Theme,
  language: Language
}

const EditorPane = ({ code, setCode, theme, language }: IEditorPane) => {

  const options = {
    cursorStyle: "line"
  }

  return (
    <div id="editor-pane">
        <Editor
            height={`100%`}
            width={`100%`}
            language={languageMapper(language)}
            value={code}
            onChange={setCode}
            theme={theme.name}
            options={options}
        />
    </div>
  )
}

export default EditorPane