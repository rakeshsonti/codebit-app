import React, { useState } from "react";
import styles from "./Admin.module.css";
import { Button } from "reactstrap";
import {
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";
const Admin = () => {
   const [topicTag, setTopicTag] = useState();
   const [questionKey, setQuestionKey] = useState();
   const [problemHead, setProblemHead] = useState();
   const [problem, setProblem] = useState();
   const [input, setInput] = useState();
   const [output, setOutput] = useState();
   const [input1, setInput1] = useState();
   const [input2, setInput2] = useState();
   const [output1, setOutput1] = useState();
   const [output2, setOutput2] = useState();
   const [task, setTask] = useState();
   const [constraints, setConstraints] = useState();
   const [timeComplexity, setTimeComplexity] = useState();
   const [spaceComplexity, setSpaceComplexity] = useState();
   const [problemLevel, setProblemLevel] = useState();
   const [point, setPoint] = useState();
   const [csolution, setCSolution] = useState();
   const [cppsolution, setCppSolution] = useState();
   const [javasolution, setJavaSolution] = useState();
   const [pythonsolution, setPythonSolution] = useState();
   const [err, setErr] = useState();
   const [language, setLanguage] = useState("language");
   const [userInput, setUserInput] = useState();
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const toggle = () => setDropdownOpen((prevState) => !prevState);
   let history = useHistory();
   const saveProblem = () => {
      fetch("http://localhost:9999/saveProblem", {
         method: "POST",
         body: JSON.stringify({
            topicTag,
            questionKey,
            problemHead,
            problem,
            input,
            output,
            input1,
            input2,
            output1,
            output2,
            task,
            constraints,
            timeComplexity,
            spaceComplexity,
            problemLevel,
            point,
            csolution,
            cppsolution,
            javasolution,
            pythonsolution,
            language,
            userInput,
         }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return {
                  success: true,
               };
            } else {
               return r.json();
            }
         })
         .then((r) => {
            if (r.success === true) {
               setErr("");
            } else {
               setErr(r.error);
            }
         })
         .catch((e) => {
            console.error(e);
         });
   };
   return (
      <div>
         <h3>Admin</h3>
         <h6>(Set Problem)</h6>
         <hr />
         <div className={styles.container}>
            <Button
               color="link"
               onClick={history.goBack}
               className={styles.backbtn}
            >
               back
            </Button>
            <div className={styles.subContainer}>
               {" "}
               <Button
                  className={styles.leftItem}
                  onClick={() => {
                     saveProblem();
                  }}
               >
                  save
               </Button>
               <textarea
                  className={styles.rightItem}
                  style={{ color: "red" }}
                  value={err}
                  disabled
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Topic Tag</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setTopicTag(e.target.value)}
                  value={topicTag}
               ></textarea>
            </div>

            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Question Key</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setQuestionKey(e.target.value)}
                  value={questionKey}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Problem Head</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setProblemHead(e.target.value)}
                  value={problemHead}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Problem</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setProblem(e.target.value)}
                  value={problem}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Input</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Output</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setOutput(e.target.value)}
                  value={output}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Input1</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setInput1(e.target.value)}
                  value={input1}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Input2</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setInput2(e.target.value)}
                  value={input2}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Output1</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setOutput1(e.target.value)}
                  value={output1}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Output2</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setOutput2(e.target.value)}
                  value={output2}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Task</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Constraints</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setConstraints(e.target.value)}
                  value={constraints}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Time Complexity</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setTimeComplexity(e.target.value)}
                  value={timeComplexity}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Space Complexity</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setSpaceComplexity(e.target.value)}
                  value={spaceComplexity}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Problem Level</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setProblemLevel(e.target.value)}
                  value={problemLevel}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Point</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setPoint(e.target.value)}
                  value={point}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>User Input</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setUserInput(e.target.value)}
                  value={userInput}
               ></textarea>
            </div>
            <div className={styles.subContainer}>
               {" "}
               <label className={styles.leftItem}>Language</label>
               <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>{language}</DropdownToggle>
                  <DropdownMenu>
                     <DropdownItem
                        onClick={() => {
                           setLanguage("c");
                        }}
                     >
                        c
                     </DropdownItem>
                     <DropdownItem
                        onClick={() => {
                           setLanguage("cpp");
                        }}
                     >
                        cpp
                     </DropdownItem>
                     <DropdownItem
                        onClick={() => {
                           setLanguage("java");
                        }}
                     >
                        java
                     </DropdownItem>
                     <DropdownItem
                        onClick={() => {
                           setLanguage("python");
                        }}
                     >
                        python
                     </DropdownItem>
                  </DropdownMenu>
               </Dropdown>
            </div>
            {language === "c" ? (
               <div className={styles.subContainer}>
                  {" "}
                  <label className={styles.leftItem}>C-Solution</label>
                  <textarea
                     className={styles.rightItem}
                     onChange={(e) => setCSolution(e.target.value)}
                     value={csolution}
                     disabled={!(language === "c")}
                  ></textarea>
               </div>
            ) : null}
            {language === "cpp" ? (
               <div className={styles.subContainer}>
                  {" "}
                  <label className={styles.leftItem}>CPP-Solution</label>
                  <textarea
                     className={styles.rightItem}
                     onChange={(e) => setCppSolution(e.target.value)}
                     value={cppsolution}
                     disabled={!(language === "cpp")}
                  ></textarea>
               </div>
            ) : null}
            {language === "java" ? (
               <div className={styles.subContainer}>
                  {" "}
                  <label className={styles.leftItem}>Java-Solution</label>
                  <textarea
                     className={styles.rightItem}
                     onChange={(e) => setJavaSolution(e.target.value)}
                     value={javasolution}
                     disabled={!(language === "java")}
                  ></textarea>
               </div>
            ) : null}
            {language === "python" ? (
               <div className={styles.subContainer}>
                  {" "}
                  <label className={styles.leftItem}>Python-Solution</label>
                  <textarea
                     className={styles.rightItem}
                     onChange={(e) => setPythonSolution(e.target.value)}
                     value={pythonsolution}
                     disabled={!(language === "python")}
                  ></textarea>
               </div>
            ) : null}
         </div>
      </div>
   );
};
export default Admin;
