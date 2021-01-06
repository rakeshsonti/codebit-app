import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import styles from "./Login.module.css";
const Login = (props) => {
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const onChangeEmail = (e) => {
      setEmail(e.target.value);
   };
   const onChangePassword = (e) => {
      setPassword(e.target.value);
   };

   const localHandler = (e) => {
      e.preventDefault();
      props.LoginHandler(email, password);
   };
   return (
      <div className={styles.container}>
         <Form className={styles.formBackground} onSubmit={localHandler}>
            <FormGroup>
               <Label for="Email">Email</Label>
               <Input
                  type="email"
                  name="email"
                  id="emailId"
                  placeholder="Enter your Email"
                  onChange={onChangeEmail}
                  required
               />
            </FormGroup>
            <FormGroup>
               <Label for="Password">Password</Label>
               <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter your password"
                  onChange={onChangePassword}
                  required
               />
            </FormGroup>
            <FormGroup>
               <p className={styles.error}>{props.error}</p>
            </FormGroup>
            <Button className={styles.button} type="submit">
               login
            </Button>{" "}
            <FormGroup className={styles.smallBtn}>
               create an account?
               <Button color="link" size="sm" onClick={props.showHandler}>
                  sign up
               </Button>
            </FormGroup>
         </Form>
      </div>
   );
};
export default Login;
