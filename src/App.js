import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
function App() {
   const [isLoggIn, setLoggIn] = useState(false);
   const [isSigninOrLogin, setIsSigninOrLogin] = useState(true);
   const [loginError, setLoginError] = useState(undefined);
   const [signupError, setSignupError] = useState(undefined);
   const [userName, setUserName] = useState(undefined);
   const getUserName = () => {
      fetch("http://localhost:9999/userinfo", { credentials: "include" })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               setLoggIn(false);
               setUserName(undefined);
               return {
                  success: false,
               };
            }
         })
         .then((r) => {
            if (r.success !== false) {
               setLoggIn(true);
               setUserName(r.email);
            }
         });
   };
   useEffect(() => {
      getUserName();
   }, []);
   const LoginHandler = (email, password) => {
      fetch("http://localhost:9999/login", {
         method: "POST",
         body: JSON.stringify({ email, password }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            //r.ok() is response between 200 to <300 then true otherwise if greater than 300 so false
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
               setLoggIn(true);
               setLoginError("");
               return getUserName();
            } else {
               // setLoggIn(false);
               setLoginError(r.err);
            }
         })
         .catch((e) => {
            console.log(e);
            setLoginError("error");
         });
   };
   const showHandler = () => {
      setIsSigninOrLogin(!isSigninOrLogin);
   };
   const SignupHandler = (name, email, password) => {
      fetch("http://localhost:9999/signup", {
         method: "POST",
         body: JSON.stringify({ email, password, name }),
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      })
         .then((r) => {
            //r.ok() is response between 200 to <300 then true otherwise if greater than 300 so false
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
               setSignupError("");
               setIsSigninOrLogin(true);
            } else {
               setSignupError(r.err);
            }
         })
         .catch((e) => {
            console.error(e);
            setSignupError(e);
         });
   };
   const logoutHandler = () => {
      return fetch("http://localhost:9999/logout", {
         method: "GET",
         credentials: "include",
      }).then((r) => {
         if (r.ok) {
            setLoggIn(false);
            setUserName(undefined);
         }
      });
   };
   return (
      <div className="App">
         {isLoggIn ? (
            <DashBoard logoutHandler={logoutHandler} />
         ) : isSigninOrLogin ? (
            <Login
               LoginHandler={LoginHandler}
               error={loginError}
               showHandler={showHandler}
            />
         ) : (
            <Signup
               SignupHandler={SignupHandler}
               error={signupError}
               showHandler={showHandler}
            />
         )}
      </div>
   );
}

export default App;
