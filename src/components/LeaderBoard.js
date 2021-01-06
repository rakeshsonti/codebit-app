import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
   Table,
   Pagination,
   PaginationItem,
   PaginationLink,
   Button,
} from "reactstrap";
import styles from "./LeaderBoard.module.css";
const LeaderBoard = () => {
   const history = useHistory();
   const [allRecords, setAllRecords] = useState([]);
   // const [limit, setLimit] = useState(10);
   const limit = 10;
   const [skip, setSkip] = useState(0);
   const [prevState, setPrevState] = useState(true);
   const [nextState, setNextState] = useState(false);
   const [active, setActive] = useState(true);
   const [nextDouble, setNextDouble] = useState(false);
   const [prevDouble, setPrevDouble] = useState(false);
   const [firstPageNumber, setFirstPageNumber] = useState(1);
   const [secondPageNumber, setSecondPageNumber] = useState(2);
   const PrevReacord = (skp) => {
      if (skip !== 0) {
         setSkip(skp);
         getRecord(skp);
         if (prevDouble) {
            setFirstPageNumber(firstPageNumber - 1);
            setSecondPageNumber(secondPageNumber - 1);
         }
         setPrevDouble(true);
         setNextDouble(false);
      }
      // console.log(skip);
   };
   const NextRecord = (skp) => {
      setSkip(skp);
      setPrevState(false);
      console.log(skip);

      getRecord(skp);
   };
   const getRecord = (skp) => {
      fetch("http://localhost:9999/getleaderboard", {
         headers: {
            "Content-Type": "application/json",
         },
         method: "POST",
         credentials: "include",
         body: JSON.stringify({
            limit: limit,
            skip: skp,
         }),
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            console.log("leaderboared data", r);
            if (r.allData.length !== 0) {
               setAllRecords(r.allData);
               console.log("data nhi hai");
            } else {
               setSkip(skp - 10);
               setNextState(true);
               setFirstPageNumber(firstPageNumber);
               setSecondPageNumber(secondPageNumber);
            }
         });
   };

   useEffect(() => {
      fetch("http://localhost:9999/getleaderboard", {
         headers: {
            "Content-Type": "application/json",
         },
         method: "POST",
         credentials: "include",
         body: JSON.stringify({
            limit: limit,
            skip: skip,
         }),
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log(r);
            }
         })
         .then((r) => {
            console.log("leaderboared data", r);
            setAllRecords(r.allData);
         });
   }, []);
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <Button color="link" onClick={history.goBack}>
               back
            </Button>
         </div>
         <hr />
         <Table className={styles.table} size="sm" hover>
            <thead>
               <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Overall Score</th>
                  {/* <th>Solved Questions</th> */}
               </tr>
            </thead>
            <tbody>
               {allRecords.map((record, index) => {
                  return (
                     <tr key={`${record}something${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{record.name}</td>
                        <td>{record.point}</td>
                        {/* <td>{record.solvedQuestion}</td> */}
                     </tr>
                  );
               })}
            </tbody>
         </Table>
         <Pagination
            aria-label="Page navigation example"
            className={styles.paginationContainer}
         >
            <PaginationItem>
               <PaginationLink
                  onClick={() => {
                     if (skip !== 0) {
                        PrevReacord(skip - 10);
                        setNextState(false);
                     } else {
                        setPrevState(true);
                     }
                     setActive(true);
                  }}
                  disabled={prevState}
               >
                  prev
               </PaginationLink>
            </PaginationItem>
            <PaginationItem active={active}>
               <PaginationLink disabled>{firstPageNumber}</PaginationLink>
            </PaginationItem>
            <PaginationItem active={!active}>
               <PaginationLink disabled>{secondPageNumber}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
               <PaginationLink
                  onClick={() => {
                     NextRecord(skip + 10);
                     setActive(false);
                     if (nextDouble) {
                        setFirstPageNumber(firstPageNumber + 1);
                        setSecondPageNumber(secondPageNumber + 1);
                     }
                     setNextDouble(true);
                     setPrevDouble(false);
                  }}
                  disabled={nextState}
               >
                  next
               </PaginationLink>
            </PaginationItem>
         </Pagination>
      </div>
   );
};
export default LeaderBoard;
