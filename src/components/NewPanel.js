import React, { useEffect, useState } from "react";
import styles from "./NewPanel.module.css";
import toggleImg from "../images/toggle.PNG";
import Editor from "./CodeEditor";
import editorItems from "./EditorItems";
import greenIcon from "../images/greenright.PNG";
import redIcon from "../images/redcross.PNG";
import { useHistory, useParams } from "react-router-dom";
import {
   Row,
   Col,
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Button,
} from "reactstrap";
const {
   allLanguaue,
   allEditor,
   allLightTheme,
   allDarkTheme,
   fontList,
   tabList,
} = editorItems;
const NewPanel = () => {
   let problems = {};
   const { key, topic } = useParams();
   const history = useHistory();
   const [topicTag, setTopicTag] = useState();
   const [problemHead, setProblemHead] = useState();
   const [problem, setProblem] = useState();
   const [input, setInput] = useState();
   const [input1, setInput1] = useState();
   const [input2, setInput2] = useState();
   const [output, setOutput] = useState();
   const [output1, setOutput1] = useState();
   const [output2, setOutput2] = useState();
   const [point, setPoint] = useState();
   const [spaceComplexity, setSpaceComplexity] = useState();
   const [timeComplexity, setTimeComplexity] = useState();
   const [level, setLevel] = useState();
   const [task, setTask] = useState();
   const [constraints, setConstraints] = useState();

   useEffect(() => {
      fetch(`http://localhost:9999/getProblem/${topic}/${key}`, {
         method: "POST",
         credentials: "include",
      })
         .then((r) => {
            return r.json();
         })
         .then((r) => {
            // setProblems(r);
            problems = [...r];
            let {
               topicTag,
               problemHead,
               problem,
               input,
               input1,
               input2,
               output,
               output1,
               output2,
               point,
               spaceComplexity,
               timeComplexity,
               problemLevel,
               task,
               constraints,
            } = r[0];
            console.log("r value :", r);
            setTopicTag(topicTag);
            setProblemHead(problemHead);
            setProblem(problem);
            setInput(input);
            setInput1(input1);
            setInput2(input2);
            setOutput(output);
            setOutput1(output1);
            setOutput2(output2);
            setPoint(point);
            setSpaceComplexity(spaceComplexity);
            setTimeComplexity(timeComplexity);
            setLevel(problemLevel);
            setTask(task);
            setConstraints(constraints);
         });
   }, []);
   // console.log("ques key : ", questionKey);
   const [userInput, setUserInput] = useState();
   const [userOutput, setUserOutput] = useState("");
   const [testResult, setTestResult] = useState([true, false, true, false]);
   const value = "public static vois main(String args[]);";
   const [userCode, setUserCode] = useState(value);
   const [font, setFont] = useState(10);
   const [tab, setTab] = useState(4);
   const [language, setLanguage] = useState("java");
   const [theme, setTheme] = useState("monokai");
   const [editor, setEditor] = useState("vscode");
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
      // console.log(e.target.value);
      setUserInput(e.target.value);
      // setUserOutput(e.target.value);
   };

   const run = () => {
      fetch("http://localhost:9999/run", {
         method: "POST",
         body: JSON.stringify({
            sourceCode: userCode,
            language: language,
            input: userInput,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((r) => {
            return r.JSON();
            // console.log(r.JSON());
            // setUserOutput("ram is great\r\n260\r\n");
         })
         .then((r) => console.log(r))
         .catch((e) => {
            console.log(e);
         });
   };

   // -------------------------------
   // console.log(userCode);
   const [toggleProblem, setToggleProblem] = useState(true);
   return (
      <div className={styles.container}>
         <div className={styles.toggle}>
            <Button
               color="link"
               size="sm"
               onClick={() => {
                  history.goBack();
               }}
            >
               back
            </Button>
            <img
               alt="toggle alt"
               className={styles.toggleImg}
               onClick={() => {
                  setToggleProblem(!toggleProblem);
                  // setUserOutput("ram is great\r\n260\r\n");
               }}
               src={toggleImg}
            />
         </div>
         {toggleProblem ? (
            <div className={styles.problemContainer}>
               <div className={styles.body}>
                  <h6 className={styles.proHead}>{problemHead}</h6>
                  <div className={styles.row1}>
                     <div>Level : {level}</div>
                     <div>Topic Tag : {topicTag}</div>
                     <div>Point: {point}</div>
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.subcontainer}>
                     <p>{problem}</p>
                     <div className={styles.h7}>
                        Basic info (Input and Output) :
                     </div>{" "}
                     <div className={styles.input}>
                        <div className={styles.h7}>Input </div>
                        <div>{input}</div>
                        <div className={styles.h7}>Output </div>
                        <div>{output}</div>
                     </div>
                     <br />
                     <div className={styles.h7}>Example :</div>{" "}
                     <div className={styles.input}>
                        <div className={styles.h7}>Input 1</div>
                        <div>{input1}</div>
                        <div className={styles.h7}>Output 1</div>
                        <div>{output1}</div>
                     </div>
                     <br />
                     <div className={styles.h7}>Example :</div>{" "}
                     <div className={styles.input}>
                        <div className={styles.h7}>Input 2</div>
                        <div>{input2}</div>
                        <div className={styles.h7}>Output 2</div>
                        <div>{output2}</div>
                     </div>
                     <br />
                     <div className={styles.h7}>Your Task:</div>
                     <div>{task}</div>
                     <br />
                     <div className={styles.h7}>Expected Time Complexity:</div>
                     <div>{timeComplexity}</div>
                     <br />
                     <div className={styles.h7}>Expected Auxiliary Space:</div>
                     <div> {spaceComplexity}</div>
                     <br />
                     <div className={styles.h7}>Constraints:</div>
                     <div>{constraints}</div>
                  </div>
               </div>
            </div>
         ) : (
            <div></div>
         )}
         {/* ------------------------problem part is finished */}

         <div className={styles.editorHead}>
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
               <DropdownToggle caret>{tab}</DropdownToggle>
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
            <Button size="sm">reset</Button>

            <div style={{ color: "white" }}>.....</div>
            <Button size="sm">run</Button>
            <div style={{ color: "white" }}>.....</div>
            <Button size="sm">submit</Button>
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
                  <div className={styles.consoleTestcase}>
                     {testResult.map((res, index) => {
                        return (
                           <div
                              className={styles.testDiv}
                              key={`${res}${index}`}
                           >
                              <h6>Test case {index + 1}</h6>
                              {res ? (
                                 <img
                                    src={greenIcon}
                                    alt="test img"
                                    className={styles.testimg}
                                 ></img>
                              ) : (
                                 <img
                                    src={redIcon}
                                    alt="test img"
                                    className={styles.testimg}
                                 ></img>
                              )}
                           </div>
                        );
                     })}
                  </div>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default NewPanel;
