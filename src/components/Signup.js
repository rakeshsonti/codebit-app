import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import styles from "./Login.module.css";
import Login from "./Login";
const Signup = (props) => {
   return (
      <div className={styles.container}>
         <Form className={styles.formBackground}>
            <FormGroup>
               <Label for="name">Name</Label>
               <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
               />
            </FormGroup>
            <FormGroup>
               <Label for="Email">Email</Label>
               <Input
                  type="email"
                  name="email"
                  id="emailId"
                  placeholder="Enter your Email"
               />
            </FormGroup>
            <FormGroup>
               <Label for="Password">Password</Label>
               <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter your password"
               />
            </FormGroup>
            <FormGroup>
               <FormText className={styles.error}></FormText>
            </FormGroup>
            <Button className={styles.button}>sign up</Button>{" "}
            <FormGroup className={styles.smallBtn}>
               have an account?
               <Button
                  color="link"
                  size="sm"
                  onClick={() => {
                     <Login />;
                  }}
               >
                  sign in
               </Button>
            </FormGroup>
         </Form>
      </div>
   );
};
export default Signup;
