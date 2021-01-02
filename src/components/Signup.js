import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styles from "./Login.module.css";
const Signup = (props) => {
   const [name, setName] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const onChangeName = (e) => {
      setName(e.target.value);
   };
   const onChangeEmail = (e) => {
      setEmail(e.target.value);
   };
   const onChangePassword = (e) => {
      setPassword(e.target.value);
   };

   const localHandler = (e) => {
      e.preventDefault();
      props.SignupHandler(name, email, password);
   };
   return (
      <div className={styles.container}>
         <Form className={styles.formBackground} onSubmit={localHandler}>
            <FormGroup>
               <Label for="name">Name</Label>
               <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  onChange={onChangeName}
                  required
               />
            </FormGroup>
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
            <Button className={styles.button} type="submit">
               sign up
            </Button>{" "}
            <FormGroup className={styles.smallBtn}>
               have an account?
               <Button color="link" size="sm" onClick={props.showHandler}>
                  sign in
               </Button>
            </FormGroup>
            <FormGroup>
               <p className={styles.error}>{props.error}</p>
            </FormGroup>
         </Form>
      </div>
   );
};
export default Signup;
