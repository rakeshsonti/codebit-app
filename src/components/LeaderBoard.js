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
   };
   const NextRecord = (skp) => {
      setSkip(skp);
      setPrevState(false);
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
            if (r.allData.length !== 0) {
               setAllRecords(r.allData);
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
                  <th className={styles.rank}>Rank</th>
                  <th className={styles.name}>Username</th>
                  <th className={styles.rank}>Overall Score</th>
               </tr>
            </thead>
            <tbody>
               {allRecords.map((record, index) => {
                  return (
                     <tr key={`${record}something${index}`}>
                        <th scope="row" className={styles.rank}>
                           {index + 1}
                        </th>
                        <td className={styles.name}>{record.name}</td>
                        <td className={styles.rank}>{record.point}</td>
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
