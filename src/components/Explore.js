import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

import styles from "./Explore.module.css";
const Explore = () => {
   const { topicTag } = useParams();
   const [problems, setProblems] = useState([]);
   const history = useHistory();
   useEffect(() => {
      fetch(`http://localhost:9999/getProblemSet/${topicTag}`, {
         method: "POST",
         credentials: "include",
      })
         .then((r) => {
            return r.json();
         })
         .then((r) => {
            setProblems(r);
         });
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.btn}>
            <Button
               color="link"
               onClick={() => {
                  history.goBack();
               }}
            >
               back
            </Button>
         </div>
         {/* --------------problem div */}
         <div className={styles.header}>
            <h6 className={styles.subheader}>Tag : {topicTag}</h6>
         </div>
         {problems.map((arr, index) => {
            return (
               <div className={styles.problemDiv} key={arr["questionKey"]}>
                  <div className={styles.h7}>
                     <h6 style={{ color: "green" }}>Problem : {index + 1}</h6>
                     <p>Level : {arr["problemLevel"]}</p>
                  </div>
                  <div className={styles.h7}>
                     <h6>{arr["problemHead"]}</h6>
                     <p>Point : {arr["point"]}</p>
                  </div>
                  <p>{arr["problem"]}</p>

                  <Button
                     size="sm"
                     color="primary"
                     className={styles.problemBtn}
                     onClick={() => {
                        history.push(
                           `/problem/${arr["questionKey"]}/${arr["topicTag"]}/${arr["problemHead"]}`
                        );
                     }}
                  >
                     start
                  </Button>

                  <hr />
               </div>
            );
         })}
      </div>
   );
};
export default Explore;
