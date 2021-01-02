import React from "react";
import styles from "./Home.module.css";
import Array from "../images/array.PNG";
import LinkedList from "../images/linkedlist.PNG";
import Stack from "../images/stack.PNG";
import Queue from "../images/queue.PNG";
import Tree from "../images/tree.PNG";
import Heap from "../images/heap.PNG";
import Matrix from "../images/matrix.PNG";
import Graph from "../images/graph.PNG";
import Searching from "../images/searching.PNG";
import Sorting from "../images/sorting.PNG";
import Recursion from "../images/recursion.PNG";
import Hashing from "../images/hashing.PNG";
import Explore from "./Explore";
import { Card, Button, CardImg, CardFooter } from "reactstrap";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect,
   useHistory,
} from "react-router-dom";

const Home = (props) => {
   let history = useHistory();
   console.log("history ", history);
   const handlerClick = () => {
      history.push("/explore");
   };
   return (
      <div className={styles.container}>
         <h4 className={styles.head3}>Data Structure & Algorithms</h4>
         <hr />
         <Router>
            <div className={styles.subcontainer}>
               <Card className={styles.card}>
                  <CardImg top src={Array} alt="array img" />
                  <CardFooter>
                     <Link to="/explore">
                        <Button
                           variant="outline-dark"
                           size="sm"
                           onClick={handlerClick}
                        >
                           array
                        </Button>
                     </Link>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={LinkedList} alt="linkedlist img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        linkedlist
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Stack} alt="stack img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        stack
                     </Button>
                  </CardFooter>
               </Card>
            </div>
            <br />
            {/* //--------------------------------------------------------- */}
            <div className={styles.subcontainer}>
               <Card className={styles.card}>
                  <CardImg top src={Queue} alt="queue img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        queue
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Tree} alt="tree img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        tree
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Heap} alt="heap img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        heap
                     </Button>
                  </CardFooter>
               </Card>
            </div>
            <br />

            {/* //---------------------------------------------- */}
            <div className={styles.subcontainer}>
               <Card className={styles.card}>
                  <CardImg top src={Matrix} alt="Matrix img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        matrix
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Graph} alt="Graph img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        graph
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Searching} alt="Searching img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        searching
                     </Button>
                  </CardFooter>
               </Card>
            </div>
            <br />

            {/* //---------------------------------------------- */}
            <div className={styles.subcontainer}>
               <Card className={styles.card}>
                  <CardImg top src={Sorting} alt="Sorting img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        sorting
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Recursion} alt="Recursion img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        recursion
                     </Button>
                  </CardFooter>
               </Card>
               <Card className={styles.card}>
                  <CardImg top src={Hashing} alt="Hashing img" />
                  <CardFooter>
                     <Button variant="outline-dark" size="sm">
                        hashing
                     </Button>
                  </CardFooter>
               </Card>
            </div>
            <br />

            {/* //---------------------------------------------- */}
         </Router>
      </div>
   );
};
export default Home;
