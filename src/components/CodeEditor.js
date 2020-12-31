import React from "react";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
// import brace from "brace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor(props) {
   function onChange(newValue) {
      // console.log("change", newValue);
      props.onChange(newValue);
   }
   return (
      <AceEditor
         mode={props.language}
         theme={props.theme}
         onChange={onChange}
         keyboardHandler={props.editor}
         // height={height}
         // width={width}
         // fontFamily={fontFamily}
         // readOnly="false"
         value={props.value}
         tabSize={props.tab}
         fontSize={props.font}
         showLineNumbers="true"
         name="UNIQUE_ID_OF_DIV"
         editorProps={{ $blockScrolling: true }}
         setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
         }}
      />
   );
}
export default Editor;
