import React, { useState } from "react";
import styles from "./DashBoard.module.css";
import {
   Collapse,
   NavbarToggler,
   NavbarBrand,
   Navbar,
   Nav,
   NavItem,
   Button,
} from "reactstrap";
import {
   BrowserRouter as Router,
   Route,
   NavLink,
   useHistory,
} from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask";
import LeaderBoard from "./LeaderBoard";
import NewPanel from "./NewPanel";
import Profile from "./Profile";
import Explore from "./Explore";
import Admin from "./Admin";
function DashBoard(props) {
   const [isOpen, setIsOpen] = useState(false);
   const toggle = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div>
         <Router>
            <Navbar
               color="dark"
               dark
               expand="sm"
               className={styles.navbarstyle}
            >
               <NavbarBrand href="/">CodeBit</NavbarBrand>
               <NavbarToggler onClick={toggle} />
               <Collapse isOpen={isOpen} navbar>
                  <Nav>
                     <NavItem>
                        <NavLink to="/">
                           <Button
                              outline
                              color="success"
                              size="sm"
                              className={styles.navitem}
                           >
                              Practice
                           </Button>
                        </NavLink>
                     </NavItem>

                     <NavItem>
                        <NavLink to="/leaderboard">
                           <Button
                              outline
                              color="success"
                              size="sm"
                              className={styles.navitem}
                           >
                              Leaderboard
                           </Button>
                        </NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/newpanel">
                           <Button
                              outline
                              color="success"
                              size="sm"
                              className={styles.navitem}
                           >
                              New Panel
                           </Button>
                        </NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/ask">
                           <Button
                              outline
                              color="warning"
                              size="sm"
                              className={styles.navitem}
                           >
                              Ask ?
                           </Button>
                        </NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/profile">
                           <Button
                              outline
                              color="success"
                              size="sm"
                              className={styles.navitem}
                           >
                              Profile
                           </Button>
                        </NavLink>
                     </NavItem>
                     <NavItem>
                        <Button
                           outline
                           color="danger"
                           size="sm"
                           className={styles.navitem}
                           onClick={props.logoutHandler}
                        >
                           Log out
                        </Button>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/admin">
                           <Button
                              outline
                              color="success"
                              size="sm"
                              className={styles.navitem}
                           >
                              Admin
                           </Button>
                        </NavLink>
                     </NavItem>
                  </Nav>
               </Collapse>
            </Navbar>
            {/* <Switch> */}
            <Route exact path="/">
               <Home />
            </Route>

            <Route exact path="/leaderboard">
               <LeaderBoard />
            </Route>
            <Route exact path="/newpanel">
               <NewPanel />
            </Route>
            <Route exact path="/ask">
               <Ask />
            </Route>
            <Route exact path="/profile">
               <Profile />
            </Route>
            <Route exact path="/admin">
               <Admin />
            </Route>
            <Route exact path="/explore/:topicTag">
               <Explore />
            </Route>
            <Route path="/problem/:key/:topic/:name">
               <NewPanel />
            </Route>

            {/* </Switch> */}
         </Router>
      </div>
   );
}

export default DashBoard;
