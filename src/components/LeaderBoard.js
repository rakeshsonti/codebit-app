import React from "react";
import {
   Table,
   Pagination,
   PaginationItem,
   PaginationLink,
   InputGroup,
   Input,
   InputGroupAddon,
   InputGroupText,
   Button,
} from "reactstrap";
import styles from "./LeaderBoard.module.css";
const LeaderBoard = () => {
   const records = [
      {
         userName: "ram",
         score: 2345,
         solvedQuestion: 23,
      },
      {
         userName: "lakhan",
         score: 233,
         solvedQuestion: 24,
      },
      {
         userName: "krishna",
         score: 2355,
         solvedQuestion: 21,
      },
      {
         userName: "arjun",
         score: 2345,
         solvedQuestion: 29,
      },
      {
         userName: "aryan",
         score: 2345,
         solvedQuestion: 209,
      },
      {
         userName: "vijay",
         score: 2005,
         solvedQuestion: 230,
      },
      {
         userName: "rohit",
         score: 25,
         solvedQuestion: 111,
      },
      {
         userName: "shri",
         score: 234,
         solvedQuestion: 234,
      },
      {
         userName: "pooja",
         score: 235,
         solvedQuestion: 567,
      },
      {
         userName: "ruhi",
         score: 2985,
         solvedQuestion: 2334,
      },
   ];
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <InputGroup className={styles.searching} size="sm">
               <Input placeholder="searching" />
               <InputGroupAddon addonType="append">
                  <Button className={styles.btn}>?</Button>
               </InputGroupAddon>
            </InputGroup>
         </div>
         <hr />
         <Table className={styles.table} size="sm" hover>
            <thead>
               <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Overall Score</th>
                  <th>Solved Questions</th>
               </tr>
            </thead>
            <tbody>
               {records.map((record, index) => {
                  return (
                     <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{record.userName}</td>
                        <td>{record.score}</td>
                        <td>{record.solvedQuestion}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
         <Pagination
            aria-label="Page navigation example"
            className={styles.paginationContainer}
         >
            <PaginationItem disabled>
               <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled>
               <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem active>
               <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
               <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
               <PaginationLink last href="#" />
            </PaginationItem>
         </Pagination>
      </div>
   );
};
export default LeaderBoard;
