import React, { useState } from "react";
import styles from "./Admin.module.css";
import { Button } from "reactstrap";
const Admin = (props) => {
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
   const [solution, setSolution] = useState();
   const [err, setErr] = useState();
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
            solution,
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
            // setErr(e);
         });
   };
   console.log(topicTag);
   return (
      <div>
         <h3>Admin</h3>
         <h6>(Set Problem)</h6>
         <hr />
         <div className={styles.container}>
            <div className={styles.subContainer}>
               {" "}
               <Button className={styles.leftItem} onClick={saveProblem}>
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
               <label className={styles.leftItem}>Solution</label>
               <textarea
                  className={styles.rightItem}
                  onChange={(e) => setSolution(e.target.value)}
                  value={solution}
               ></textarea>
            </div>
         </div>
      </div>
   );
};
export default Admin;
