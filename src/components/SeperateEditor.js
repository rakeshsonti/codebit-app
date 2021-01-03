import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SeperateEditor.module.css";
import Editor from "./CodeEditor";
import editorItems from "./EditorItems";
import {
   Row,
   Col,
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Button,
   Spinner,
} from "reactstrap";
const {
   allLanguaue,
   allEditor,
   allLightTheme,
   allDarkTheme,
   fontList,
   tabList,
} = editorItems;
const SeperateEditor = () => {
   const [runSpinner, setRunSpinner] = useState(true);
   const [userCode, setUserCode] = useState();
   const [userInput, setUserInput] = useState();
   const [userOutput, setUserOutput] = useState();
   const [font, setFont] = useState(14);
   const [tab, setTab] = useState(2);
   const [language, setLanguage] = useState("java");
   const [theme, setTheme] = useState("xcode");
   const [editor, setEditor] = useState("ace");
   const [dropdownOpenFont, setDropdownOpenFont] = useState(false);
   const toggleFont = () => setDropdownOpenFont((prevState) => !prevState);
   const [dropdownOpenTab, setDropdownOpenTab] = useState(false);
   const toggleTab = () => setDropdownOpenTab((prevState) => !prevState);
   const [dropdownOpenLang, setDropdownOpenLang] = useState(false);
   const toggleLang = () => setDropdownOpenLang((prevState) => !prevState);
   const [dropdownOpenTheme, setDropdownOpenTheme] = useState(false);
   const toggleTheme = () => setDropdownOpenTheme((prevState) => !prevState);
   const [dropdownOpenEditor, setDropdownOpenEditor] = useState(false);

   const toggleEditor = () => setDropdownOpenEditor((prevState) => !prevState);
   const changeInput = (e) => {
      setUserInput(e.target.value);
   };
   let history = useHistory();
   //----------------------------------------------------
   const run = () => {
      fetch("http://localhost:9999/runCode", {
         method: "POST",
         body: JSON.stringify({
            input: userInput,
            currentLanguage: language,
            sourceCode: userCode,
         }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            return r.json();
         })
         .then((r) => {
            console.log(r.res);
            if (r.res.stdout) {
               setRunSpinner(true);
               setUserOutput(r.res.stdout);
            } else {
               setRunSpinner(true);
               setUserOutput(r.res.stderr);
            }
            // return r;
         });
   };
   return (
      <div className={styles.container}>
         <div className={styles.editorHead}>
            <Button
               size="sm"
               color="link"
               onClick={() => {
                  history.goBack();
               }}
            >
               back
            </Button>
            <div style={{ color: "white" }}>........</div>
            <Dropdown isOpen={dropdownOpenLang} toggle={toggleLang} size="sm">
               <DropdownToggle caret>{language}</DropdownToggle>
               <DropdownMenu>
                  {allLanguaue.map((lang, index) => {
                     return (
                        <DropdownItem
                           key={`${lang}${index}`}
                           size="sm"
                           onClick={() => {
                              setLanguage(lang);
                           }}
                        >
                           {lang}
                        </DropdownItem>
                     );
                  })}
               </DropdownMenu>
            </Dropdown>
            <div style={{ color: "white" }}>.....</div>
            {/* -----------------------editor type */}
            <Dropdown isOpen={dropdownOpenTheme} toggle={toggleTheme} size="sm">
               <DropdownToggle caret>{theme}</DropdownToggle>
               <DropdownMenu>
                  <div className={styles.themeScroll}>
                     <DropdownItem>Dark Theme</DropdownItem>
                     <DropdownItem divider />

                     {allDarkTheme.map((themeValue, index) => {
                        return (
                           <DropdownItem
                              key={`${themeValue}${index}`}
                              size="sm"
                              onClick={() => {
                                 setTheme(themeValue);
                              }}
                           >
                              {themeValue}
                           </DropdownItem>
                        );
                     })}
                     <DropdownItem divider />
                     <DropdownItem>Light Theme</DropdownItem>
                     <DropdownItem divider />
                     {allLightTheme.map((themeValue, index) => {
                        return (
                           <DropdownItem
                              key={`${themeValue}${index}`}
                              size="sm"
                              onClick={() => {
                                 setTheme(themeValue);
                              }}
                           >
                              {themeValue}
                           </DropdownItem>
                        );
                     })}
                  </div>
               </DropdownMenu>
            </Dropdown>
            <div style={{ color: "white" }}>.....</div>
            {/* -------editor type */}
            <Dropdown
               isOpen={dropdownOpenEditor}
               toggle={toggleEditor}
               size="sm"
            >
               <DropdownToggle caret>{editor}</DropdownToggle>
               <DropdownMenu>
                  {allEditor.map((editorValue, index) => {
                     return (
                        <DropdownItem
                           key={`${editorValue}${index}`}
                           size="sm"
                           onClick={() => {
                              setEditor(editorValue);
                           }}
                        >
                           {editorValue}
                        </DropdownItem>
                     );
                  })}
               </DropdownMenu>
            </Dropdown>
            <div style={{ color: "white" }}>.....</div>
            {/* ----------------------font */}
            <Dropdown isOpen={dropdownOpenFont} toggle={toggleFont} size="sm">
               <DropdownToggle caret>{font}</DropdownToggle>
               <DropdownMenu>
                  <div className={styles.fontScroll}>
                     {fontList.map((fontValue, index) => {
                        return (
                           <DropdownItem
                              key={`${fontValue}${index}`}
                              size="sm"
                              onClick={() => {
                                 setFont(fontValue);
                              }}
                           >
                              {fontValue}
                           </DropdownItem>
                        );
                     })}
                  </div>
               </DropdownMenu>
            </Dropdown>
            <div style={{ color: "white" }}>.....</div>
            {/* -----------tab */}
            <Dropdown isOpen={dropdownOpenTab} toggle={toggleTab} size="sm">
               <DropdownToggle caret>tab</DropdownToggle>
               <DropdownMenu>
                  <div className={styles.tabScroll}>
                     {tabList.map((tabValue, index) => {
                        return (
                           <DropdownItem
                              key={`${tabValue}${index}`}
                              size="sm"
                              onClick={() => {
                                 setTab(tabValue);
                              }}
                           >
                              {tabValue}
                           </DropdownItem>
                        );
                     })}
                  </div>
               </DropdownMenu>
            </Dropdown>
            <div style={{ color: "white" }}>.....</div>
            <Button
               hidden={!runSpinner}
               color="primary"
               size="sm"
               onClick={() => {
                  setRunSpinner(false);
                  run();
               }}
            >
               run
            </Button>
            <Spinner color="primary" hidden={runSpinner} />
         </div>
         {/* main editor------------------------ */}
         <div>
            <Row className={styles.editorContainer}>
               <Col lg={7} md={7}>
                  <Editor
                     className={styles.editor}
                     value={userCode}
                     tab={tab}
                     language={language}
                     theme={theme}
                     editor={editor}
                     font={font}
                     onChange={setUserCode}
                  />
               </Col>
               <Col lg={5} md={5} className={styles.consoleContainer}>
                  <textarea
                     className={styles.consoleOutput}
                     value={userOutput}
                     disabled
                  >
                     {userOutput}
                  </textarea>
                  <textarea
                     className={styles.consoleInput}
                     onChange={changeInput}
                     value={userInput}
                  ></textarea>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default SeperateEditor;
