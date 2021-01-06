import React, { useState, lazy, Suspense } from "react";
import styles from "./DashBoard.module.css";
import {
   PersonBoundingBox,
   Envelope,
   Award,
   Power,
   PlusSquare,
   // QuestionCircle,
} from "react-bootstrap-icons";
import {
   Collapse,
   NavbarToggler,
   NavbarBrand,
   Navbar,
   Nav,
   NavItem,
   Button,
   ButtonDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Spinner,
} from "reactstrap";
import ProfileIcon from "../images/code.PNG";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
const Home = lazy(() => import("./Home"));
const Explore = lazy(() => import("./Explore"));
const NewPanel = lazy(() => import("./NewPanel"));
const Ask = lazy(() => import("./Ask"));
const LeaderBoard = lazy(() => import("./LeaderBoard"));
const Admin = lazy(() => import("./Admin"));
const SeperateEditor = lazy(() => import("./SeperateEditor"));

function DashBoard(props) {
   const [isOpen, setIsOpen] = useState(false);
   const [profileName, setProfileName] = useState("");
   const [profileUsername, setProfileUsername] = useState("");
   const [profileScore, setProfileScore] = useState();
   const toggle = () => {
      setIsOpen(!isOpen);
   };
   const [dropdownOpenProfile, setOpenProfile] = useState(false);

   const toggleProfile = () => setOpenProfile(!dropdownOpenProfile);
   const FindProfile = () => {
      fetch("http://localhost:9999/getProfile", {
         headers: {
            "Content-Type": "application/json",
         },
         method: "GET",
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
            if (r.profile[0] !== null || r.profile[0] !== undefined) {
               setProfileName(r.profile[0].name);
               setProfileUsername(r.profile[0].username);
               setProfileScore(r.profile[0].point);
            }
         });
   };

   return (
      <div>
         <Suspense
            fallback={
               <div className={styles.fallback}>
                  {" "}
                  <Spinner color="primary" />
                  Loading............
               </div>
            }
         >
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
                                 <PlusSquare />
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
                                 {/* <QuestionCircle /> */}
                                 Ask
                              </Button>
                           </NavLink>
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
                        <NavItem>
                           <img
                              src={ProfileIcon}
                              width="35px"
                              height="33px"
                              alt="profile icon"
                           ></img>
                           <ButtonDropdown
                              isOpen={dropdownOpenProfile}
                              toggle={toggleProfile}
                              size="sm"
                              className={styles.navitem}
                              color="secondary"
                              onClick={() => {
                                 FindProfile();
                              }}
                           >
                              <DropdownToggle
                                 size="sm"
                                 color="success"
                                 caret
                              ></DropdownToggle>
                              <DropdownMenu>
                                 <DropdownItem
                                    header
                                    className={styles.profileH1}
                                 >
                                    <PersonBoundingBox /> {profileName}
                                 </DropdownItem>
                                 <DropdownItem className={styles.profileH2}>
                                    <Envelope /> {profileUsername}
                                 </DropdownItem>

                                 <DropdownItem divider />
                                 <DropdownItem className={styles.profileH4}>
                                    <Award /> Score : {profileScore}
                                 </DropdownItem>
                              </DropdownMenu>
                           </ButtonDropdown>
                        </NavItem>

                        <NavItem>
                           <Button
                              outline
                              color="danger"
                              size="sm"
                              className={styles.navitem}
                              onClick={props.logoutHandler}
                           >
                              <Power />
                           </Button>
                        </NavItem>
                     </Nav>
                  </Collapse>
               </Navbar>
               <Route exact path="/">
                  <Home />
               </Route>

               <Route exact path="/leaderboard">
                  <LeaderBoard />
               </Route>
               <Route exact path="/newpanel">
                  <SeperateEditor />
               </Route>
               <Route exact path="/ask">
                  <Ask />
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
            </Router>
         </Suspense>
      </div>
   );
}

export default DashBoard;
