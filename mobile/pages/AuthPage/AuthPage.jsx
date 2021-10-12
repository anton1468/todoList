/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable quotes */
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "./../../hooks/http.hook";
import { useToast } from 'react-native-toast-notifications';
import { Formik } from 'formik';
import validation from './../../validation/validation';
const AuthPage = () => {
  const toast = useToast();
  const auth = useContext(AuthContext);
  const { request, error } = useHttp();
  const [mail, setMail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
  const [register, setRegister] = useState(false);
  const addMail = (event) => {
    setMail({ email: event.target.value });
  };
  useEffect(() => {
    if (error) {
      toast.show("Invalid values", { type: 'danger' });
    }
  }, [error]);
  const addPassword = (event) => {
    setPassword({ password: event.target.value });
  };
  const registerHandler = async () => {
    try {
      await request("http://localhost:5000/api/user/register", "POST", Object.assign(mail, password));
      toast.show('successfully registred', { type: 'success' });
    } catch (err) {
      toast.show('Something went wrong', { type: 'danger' });
    }
  };
  const loginHandler = async () => {
    try {
      const data = await request("http://localhost:5000/api/user/login", "POST", Object.assign(mail, password));
      if (data.hasOwnProperty("token")) {
        toast.show('successfully signed-in', { type: 'success' });
        auth.login(data.token, data.userId);
      };
    } catch (err) {
      toast.show('Something went wrong', { type: 'danger' });
    }
  };
  const changeRegister = () => {
    setRegister(true);
  };
  const changeLogin = () => {
    setRegister(false);
  };
  return (
    <View>
      <TextInput style={styles.textInput}
        type="text"
        id="email"
        placeholder="Email"
        onChange={addMail}
      />
      <TextInput style={styles.textInput}
        type="text"
        id="password"
        placeholder="Password"
        onChange={addPassword}
      />
      {register ? <TextInput style={styles.textInput}
        type="text"
        id="password"
        placeholder="Confirm password"
      /> : null}
      {register ? null : <View style={styles.button}>
        <Button
          onPress={loginHandler}
          title="Login"
          color={'#3949ab'}
        />
      </View>}
      {register ? <View style={styles.button}>
              <Button
                onPress={registerHandler}
                title="Register"
                color={'#3949ab'}
              />
      </View> : null}
      <View>
        <Text onPress={changeLogin}>Login</Text>
        <Text onPress={changeRegister}>Register</Text>
      </View>
    </View>
  );
};

export default AuthPage;
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  textInput: {
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#3949ab',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  label: {
    color: '#3949ab'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginBottom: 5,
  },
  checkbox: {
    marginVertical: 10,
  },
  checkboxText: {
    color: '#3949ab'
  },
  button: {
    marginBottom: 10,
    borderColor: '#3949ab',
    borderRadius: 3,
    borderWidth: 1,
    width: '100%',
    color: 'white',
  },
  error: {
    borderColor: 'red',
  },
});