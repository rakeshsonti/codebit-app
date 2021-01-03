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
const NewPanel = () => {
   let problems = {};
   let initialLoadData = {};
   const { key, topic } = useParams();
   const history = useHistory();
   const [spinner, setSpinner] = useState(true);
   const [runSpinner, setRunSpinner] = useState(true);
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
   const [userInput, setUserInput] = useState();
   const [userOutput, setUserOutput] = useState("");
   const [testResult, setTestResult] = useState();
   // const value = "";
   const [userCode, setUserCode] = useState();
   const [font, setFont] = useState(14);
   const [tab, setTab] = useState(2);
   const [language, setLanguage] = useState();
   const [theme, setTheme] = useState("monokai");
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
      // console.log(e.target.value);
      setUserInput(e.target.value);
      // setUserOutput(e.target.value);
   };
   //-----------------------------
   const isNullOrUndefined = (value) => value === null || value === undefined;
   //----------------run test cases----------------

   const submit = async () => {
      // console.log("chla submit");
      let adminResult = await fetch("http://localhost:9999/runTestCase", {
         method: "POST",
         body: JSON.stringify({
            input: userInput,
            currentLanguage: language,
            sourceCode: userCode,
            point,
            key: key,
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
            // console.log(r);
            return r;
         });
      ///admin role finish
      let userResult = await fetch("http://localhost:9999/runCode", {
         method: "POST",
         body: JSON.stringify({
            input: userInput,
            currentLanguage: language,
            sourceCode: userCode,
            point,
            key: key,
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
            // console.log(r);
            setUserOutput("");
            return r;
         });
      // console.log("userresult :", userResult.res.stdout);
      // console.log("admin res :", adminResult.res.stdout);
      let flag = false;
      if (
         userResult.res.stdout === adminResult.res.stdout &&
         !isNullOrUndefined(userResult.res.stdout) &&
         !isNullOrUndefined(adminResult.res.stdout) &&
         adminResult.res.stdout.length !== 0 &&
         userResult.res.stdout.length !== 0
      ) {
         console.log("test cases passes");
         setTestResult(2);
         flag = true;
         setSpinner(true);
      } else {
         console.log("test cases are not passes");
         setTestResult(3);
         flag = false;
         setSpinner(true);
      }
      //update database according to the test cases passes or not
      await fetch("http://localhost:9999/isdone", {
         method: "POST",
         body: JSON.stringify({
            isDone: flag,
            key: key,
         }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               console.log("updated id done");
            } else {
               console.log("not updated id done");
            }
         })
         .catch((e) => {
            console.log(e);
         });
   };

   //----------------------------------------------------
   const run = () => {
      fetch("http://localhost:9999/runCode", {
         method: "POST",
         body: JSON.stringify({
            input: userInput,
            currentLanguage: language,
            sourceCode: userCode,
            point,
            questionKey: key,
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

      fetch("http://localhost:9999/saveUserCode", {
         method: "POST",
         body: JSON.stringify({
            input: userInput,
            currentLanguage: language,
            sourceCode: userCode,
            point,
            questionKey: key,
         }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return {
                  sucess: true,
               };
            } else {
               return {
                  sucess: false,
               };
            }
         })
         .then((r) => {
            if (r.sucess) {
               console.log("code saved");
            } else {
               console.log("code not saved");
            }
         });
   };
   //-----------------reset is called
   const reset = () => {
      fetch(`http://localhost:9999/defaultCode`, {
         method: "GET",
         credentials: "include",
      })
         .then((rs) => {
            return rs.json();
         })
         .then((rs) => {
            console.log(
               "initial load data :",
               rs.sourceCode,
               rs.defaultLanguage
            );
            setUserCode(rs.sourceCode);
            setLanguage(rs.defaultLanguage);
         });

      fetch("http://localhost:9999/saveUserCode", {
         method: "POST",
         body: JSON.stringify({
            input: userInput,
            currentLanguage: language,
            sourceCode: userCode,
            point,
            questionKey: key,
         }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return {
                  sucess: true,
               };
            } else {
               return {
                  sucess: false,
               };
            }
         })
         .then((r) => {
            if (r.sucess) {
               console.log("code saved");
            } else {
               console.log("code not saved");
            }
         });
   };

   // ----------when user load page hit api to get its previos data---------------------
   useEffect(() => {
      fetch(`http://localhost:9999/getInitialCode/${key}`, {
         method: "POST",
         credentials: "include",
      })
         .then((r) => {
            return r.json();
         })
         .then((r) => {
            if (r.length === 0) {
               fetch(`http://localhost:9999/defaultCode`, {
                  method: "GET",
                  credentials: "include",
               })
                  .then((rs) => {
                     return rs.json();
                  })
                  .then((rs) => {
                     // console.log(
                     //    "initial load data :",
                     //    rs.sourceCode,
                     //    rs.defaultLanguage,
                     //    rs
                     // );
                     setTestResult(1);
                     setUserCode(rs.sourceCode);
                     setLanguage(rs.defaultLanguage);
                  });
            } else {
               console.log("some saved data comming from db", r);
               if (r[0].isDone) {
                  setTestResult(2);
               } else {
                  setTestResult(3);
               }
               setUserCode(r[0].sourceCode);
               setLanguage(r[0].currentLanguage);
               console.log("test result:", r, testResult);
            }
         });
   }, []);

   //------------------------------------------
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
            <Button color="primary" size="sm" onClick={reset}>
               reset
            </Button>

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
            <div style={{ color: "white" }}>.....</div>
            <Button
               color="primary"
               size="sm"
               onClick={() => {
                  submit();
                  setSpinner(false);
               }}
               hidden={!spinner}
            >
               {" "}
               submit
            </Button>
            <Spinner type="grow" color="primary" hidden={spinner} />
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
                     <div className={styles.testDiv}>
                        <h6>Test case 1</h6>
                        {testResult === 1 ? null : testResult === 2 ? (
                           <img
                              src={greenIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        ) : (
                           <img
                              src={redIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        )}
                        <Spinner color="success" hidden={spinner} />
                     </div>
                     <div className={styles.testDiv}>
                        <h6>Test case 2</h6>
                        {testResult === 1 ? null : testResult === 2 ? (
                           <img
                              src={greenIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        ) : (
                           <img
                              src={redIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        )}
                        <Spinner color="success" hidden={spinner} />
                     </div>
                     <div className={styles.testDiv}>
                        <h6>Test case 3</h6>
                        {testResult === 1 ? null : testResult === 2 ? (
                           <img
                              src={greenIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        ) : (
                           <img
                              src={redIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        )}
                        <Spinner color="success" hidden={spinner} />
                     </div>
                     <div className={styles.testDiv}>
                        <h6>Test case 4</h6>
                        {testResult === 1 ? null : testResult === 2 ? (
                           <img
                              src={greenIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        ) : (
                           <img
                              src={redIcon}
                              alt="test img"
                              className={styles.testimg}
                              hidden={!spinner}
                           ></img>
                        )}
                        <Spinner color="success" hidden={spinner} />
                     </div>
                  </div>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default NewPanel;
