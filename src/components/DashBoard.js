import React from "react";
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
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Compete from "./Compete";
import Ask from "./Ask";
import LeaderBoard from "./LeaderBoard";
import NewPanel from "./NewPanel";
import Profile from "./Profile";
import Logout from "./Logout";
import Admin from "./Admin";
class DashBoard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isOpen: false,
      };
      this.toggle = this.toggle.bind(this);
   }
   toggle = () => {
      this.setState({
         isOpen: !this.state.isOpen,
      });
   };

   render() {
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
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
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
                           <NavLink to="/compete">
                              <Button
                                 outline
                                 color="success"
                                 size="sm"
                                 className={styles.navitem}
                              >
                                 Compete
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
                           {/* <NavLink to="/logout"> */}
                           <Button
                              outline
                              color="danger"
                              size="sm"
                              className={styles.navitem}
                              onClick={this.props.logoutHandler}
                           >
                              Log out
                           </Button>
                           {/* </NavLink> */}
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
               <Route exact path="/compete">
                  <Compete />
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
               <Route exact path="/logout">
                  {/* <Logout /> */}
               </Route>
               <Route exact path="/admin">
                  <Admin />
               </Route>
               {/* </Switch> */}
            </Router>
         </div>
      );
   }
}
export default DashBoard;
