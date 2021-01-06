import React, { useEffect, useRef, useState } from "react";
import styles from "./Ask.module.css";
import {
   Trash,
   PatchExclamation,
   PatchQuestion,
   ChevronDoubleDown,
} from "react-bootstrap-icons";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
const Ask = () => {
   const history = useHistory();
   const [problemHead, setProblemHead] = useState("");
   const [problemDescription, setProblemDescription] = useState("");
   const [toggle, setToggle] = useState(false);
   const inputHead = useRef();
   const inputDesc = useRef();
   const comment = useRef();
   const [username, setUsername] = useState("");

   const [doubtsArray, setDoubtArray] = useState([]);
   useEffect(() => {
      fetch("http://localhost:9999/doubtSectionLoad", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            setDoubtArray([...r]);
         });
      fetch("http://localhost:9999/userinformation", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            setUsername(r.name);
         });
   }, []);
   const Refresh = () => {
      fetch("http://localhost:9999/doubtSectionLoad", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            setDoubtArray([...r]);
         });
      fetch("http://localhost:9999/userinformation", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            setUsername(r.name);
         });
   };
   const deleteDoubt = (doubtId) => {
      fetch("http://localhost:9999/deleteDoubt", {
         method: "POST",
         body: JSON.stringify({ doubtId }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r;
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            // console.log(r);
         });
   };
   const deleteComment = (commentValue, commentedBy, commentId) => {
      fetch("http://localhost:9999/deleteComment", {
         method: "POST",
         body: JSON.stringify({ commentId, commentValue, commentedBy }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r;
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            // console.log(r);
         });
   };
   const saveProblem = () => {
      fetch("http://localhost:9999/doubtSection", {
         method: "POST",
         body: JSON.stringify({ problemHead, problemDescription }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r;
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            // console.log(r);
         });
   };
   const addComment = (commentId) => {
      const commentValue = comment.current.value;
      if (
         commentValue.length === 0 ||
         commentValue === null ||
         commentValue === undefined
      ) {
         comment.current.focus();
      } else {
         fetch("http://localhost:9999/addComment", {
            method: "POST",
            body: JSON.stringify({ commentId, commentValue }),
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         })
            .then((r) => {
               if (r.ok) {
                  return r;
               } else {
                  console.log(r);
               }
            })
            .then((r) => {
               // console.log(r);
            });
      }
   };

   const ShowComments = (obj) => {
      const arr = obj.probs;
      return (
         <>
            {arr.map((newObj, index) => {
               return (
                  <div
                     key={`${index}somethingnew`}
                     className={styles.commentsContainer}
                  >
                     <div className={styles.commenter}>
                        {" "}
                        <div>{newObj.suggestion}</div>
                        <div className={styles.answeredBy}>
                           {username === newObj.commentedBy ? (
                              <Trash
                                 onClick={() => {
                                    deleteComment(
                                       newObj.suggestion,
                                       newObj.commentedBy,
                                       obj.id
                                    );
                                 }}
                                 className={styles.deleteIcon}
                              />
                           ) : null}{" "}
                           answered : {newObj.commentedBy}
                        </div>
                     </div>
                  </div>
               );
            })}
            <textarea
               type="text"
               className={styles.commentInput}
               ref={comment}
            ></textarea>
            <div className={styles.commentbtn}>
               <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                     addComment(obj.id);
                  }}
               >
                  comment
               </Button>
            </div>
         </>
      );
   };
   const ShowDescription = (obj) => {
      const [toggle2, setToggle2] = useState(false);
      return (
         <>
            <div
               onClick={() => {
                  setToggle2(!toggle2);
               }}
               className={styles.description}
            >
               <div>
                  <h6>Description :</h6> {obj.probs.description}
               </div>
               <div>{obj.probs.askedTime}</div>
            </div>
            {toggle2 ? (
               <ShowComments probs={obj.probs.comments} id={obj.id} />
            ) : null}
         </>
      );
   };
   const ShowBasic = (obj) => {
      const [toggle1, setToggle1] = useState(false);
      return (
         <>
            <div
               onClick={() => {
                  setToggle1(!toggle1);
               }}
               className={styles.probH1}
            >
               <h6>Problem : {obj.probs.header}</h6>
               <ChevronDoubleDown />

               <p className={styles.askedby}>
                  {username === obj.probs.askedBy ? (
                     <Trash
                        className={styles.deleteIcon}
                        onClick={() => {
                           deleteDoubt(obj.probs._id);
                        }}
                     />
                  ) : null}
                  Asked by :{obj.probs.askedBy}
               </p>
            </div>
            {toggle1 ? (
               <ShowDescription probs={obj.probs.details} id={obj.probs._id} />
            ) : null}
         </>
      );
   };
   return (
      <div className={StyleSheet.container}>
         <div className={styles.header}>
            <PatchExclamation size="30px" />
            <h4>Ask ?</h4>
            <PatchQuestion size="30px" />
         </div>
         <div className={styles.subContainer}>
            <div className={styles.subH1}>
               <Button color="link" onClick={history.goBack} hidden={toggle}>
                  back
               </Button>
               <div hidden={toggle}>All Questions</div>
               <Button
                  color="primary"
                  size="sm"
                  hidden={toggle}
                  onClick={() => {
                     Refresh();
                  }}
               >
                  refresh
               </Button>{" "}
               <Button
                  color="primary"
                  size="sm"
                  hidden={toggle}
                  onClick={() => {
                     setToggle(!toggle);
                  }}
               >
                  add
               </Button>
            </div>
         </div>
         {toggle ? (
            <div className={styles.inputText}>
               <label className={styles.l1}>Problem Head</label>{" "}
               <textarea
                  className={styles.textArea}
                  onChange={(e) => {
                     setProblemHead(e.target.value);
                  }}
                  value={problemHead}
                  ref={inputHead}
               ></textarea>
               <label className={styles.l1}>Problem Description</label>{" "}
               <textarea
                  className={styles.txt2}
                  onChange={(e) => {
                     setProblemDescription(e.target.value);
                  }}
                  value={problemDescription}
                  ref={inputDesc}
               ></textarea>
               <div>
                  <Button
                     color="primary"
                     size="sm"
                     onClick={() => {
                        if (
                           problemHead.length === 0 ||
                           problemHead === null ||
                           problemHead === undefined
                        ) {
                           inputHead.current.focus();
                        } else {
                           if (
                              problemDescription.length === 0 ||
                              problemDescription === null ||
                              problemDescription === undefined
                           ) {
                              inputDesc.current.focus();
                           } else {
                              setToggle(!toggle);
                              saveProblem();
                           }
                        }
                     }}
                  >
                     save
                  </Button>
                  {"     "}
                  <Button
                     color="primary"
                     size="sm"
                     onClick={() => {
                        setToggle(!toggle);
                     }}
                  >
                     cancel
                  </Button>
               </div>
            </div>
         ) : null}
         {!toggle
            ? doubtsArray.map((prob, index) => {
                 return (
                    <div className={styles.problem} key={`${index}something`}>
                       <ShowBasic probs={prob} />
                    </div>
                 );
              })
            : null}
      </div>
   );
};
export default Ask;
