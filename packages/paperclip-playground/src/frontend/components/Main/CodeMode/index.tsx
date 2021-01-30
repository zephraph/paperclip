import React, { useEffect, useRef, useState } from "react";
// import Editor from "@monaco-editor/react";
import {
  globalZKeyDown,
  globalYKeyDown,
  globalSaveKeyPress
} from "paperclip-designer/src/actions";

// Can't import, otherwise the react monaco editor breaks :(
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import loadMonaco from "@monaco-editor/loader";

export type Monaco = typeof monacoEditor;
// TODO: https://github.com/microsoft/monaco-editor/issues/221

import * as styles from "./index.pc";
import { Toolbar } from "./Toolbar";
import { useAppStore } from "../../../hooks/useAppStore";
import { slimCodeEditorChanged } from "../../../actions";
import { SlimEditor } from "./Slim";
import { canEditFile } from "../../../state";
import { active as activatePaperclipExtension } from "paperclip-monaco";
import { SourceLocation } from "paperclip-utils";

export const CodeMode = () => {
  const { state, dispatch } = useAppStore();
  const { slim } = state;
  const [language, setLanguage] = useState<string>();

  let content;

  const onChange = code => {
    dispatch(slimCodeEditorChanged(code));
  };
  const onMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Z, function() {
      // 🙈
      dispatch(globalZKeyDown(null) as any);
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_Z,
      function() {
        dispatch(globalYKeyDown(null) as any);
      }
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
      dispatch(globalSaveKeyPress(null) as any);
    });
  };

  const [code, setCode] = useState<string>();
  const docContent = state.shared.documents[state.currentCodeFilePath];

  useEffect(() => {
    if (docContent instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setCode(String(reader.result));
      reader.readAsText(docContent);
    } else {
      setCode(String(docContent || ""));
    }
  }, [docContent]);

  if (canEditFile(state.currentCodeFilePath)) {
    content = (
      <styles.Content slim={slim}>
        {slim ? (
          <SlimEditor
            value={code}
            onChange={value => {
              dispatch(slimCodeEditorChanged(value));
            }}
          />
        ) : (
          <Editor
            uri={"file:///" + state.currentCodeFilePath}
            value={code}
            highlightLocation={state.highlightLocation}
            onChange={onChange}
            onMount={onMount}
            // onMount={onMount}
            // options={{
            //   minimap: {
            //     enabled: false
            //   },
            //   autoIndent: "keep"
            // }}
            // onChange={onChange}
            // width="100%"
            // value={code}
            // language={language}
            // theme="vs-dark"
          />
        )}
      </styles.Content>
    );
  } else {
    content = <styles.CantEditScreen />;
  }
  return (
    <styles.Container>
      <Toolbar />
      {content}
    </styles.Container>
  );
};

export type EditorProps = {
  uri: string;
  value: string;
  highlightLocation: SourceLocation;
  onChange: (value: string) => void;
  onMount: (editor: any, monaco: any) => void;
};

const Editor = ({ uri, value, onChange, highlightLocation, onMount }: EditorProps) => {
  const monacoRef = useRef();
  const editorRef = useRef<HTMLDivElement>();
  const [monaco, setMonaco] = useState<Monaco>();
  const [editor, setEditor] = useState<monacoEditor.editor.ICodeEditor>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (editor.getModel().uri.toString() !== uri) {
      editor.getModel().dispose();
      editor.setModel(
        monaco.editor.createModel(value, undefined, monaco.Uri.parse(uri))
      );
    } else if (editor.getValue() !== value) {
      editor.executeEdits("", [
        {
          range: editor.getModel().getFullModelRange(),
          text: value,
          forceMoveMarkers: true
        }
      ]);

      editor.pushUndoStop();
    }
  }, [monaco, editor, uri, value]);

  useEffect(() => {

    if (!highlightLocation) {
      return;
    }

    // dirty tricks here - trying to race against page changes. I'm 
    // just too damn lazy to do it the right way.
    setTimeout(() => {
      editor.setSelection(getRange(editor.getModel(), highlightLocation.start, highlightLocation.end))
    }, 100);
  }, [highlightLocation])

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    loadMonaco.init().then(monaco => {
      setMonaco(monaco);
      activatePaperclipExtension(monaco as any, { getCurrentUri: null });
      const editor = monaco.editor.create(editorRef.current, {
        language: "paperclip",
        tabSize: 2,
        automaticLayout: true,
        insertSpaces: true,
        model: monaco.editor.createModel(
          value || "",
          undefined,
          monaco.Uri.parse(uri)
        )
      });

      monaco.editor.setTheme("vs-dark");
      setEditor(editor);

      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });

      onMount(editor, monaco);

      setLoading(false);
    });

    return () => {};
  }, []);

  return (
    <>
      <div ref={editorRef} style={{ height: `100%`, width: "100%" }} />
    </>
  );
};


const getRange = (model: monacoEditor.editor.ITextModel, start: number, end: number): monacoEditor.IRange => {
  const sp = model.getPositionAt(start);
  const ep = model.getPositionAt(end);

  return {
    startColumn: sp.column,
    startLineNumber: sp.lineNumber,
    endColumn: ep.column,
    endLineNumber: ep.lineNumber
  }
}