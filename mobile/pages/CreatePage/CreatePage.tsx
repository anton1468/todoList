/* eslint-disable eol-last */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
// eslint-disable-next-line quotes

import React, { useState, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from './../../context/AuthContext';
import { 
  StyleSheet, Text, View, TextInput, Button, CheckBox } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

const CreatePage = () => {
  const toast = useToast();
  const { request } = useHttp();
  const userId = useContext(AuthContext);
  const [title, setTitle] = useState( ' ' );
  const [description, setDescription] = useState( ' ' );
  const [publicTodo, setPublic] = useState( false );
  const [completed, setCompleted] = useState( false );
  const initialData = {
    title: title,
    description: description,
    isPublic: publicTodo,
    isCompleted: completed,
    owner: userId.userId,
  };
  
  const addTitle = (event: any) => {
    setTitle( event.target.value );
  };
  const addDescription = (event: any) => {
    setDescription(event.target.value);
  };
  const addPublic = () => {
    setPublic(!publicTodo);
  };
  const addCompleted = () => {
    setCompleted(!completed);
  };
  const sendData = async () => {
    setTitle(' ');
    setDescription(' ');
    try {
     await request('http://localhost:5000/api/todos/', 'POST', initialData); 
     toast.show('Todo created', { type: 'success' });
    } catch (error) {
      toast.show('Something went wrong', { type: 'danger' });
    }
    console.log(initialData);
    
};
return (
    <View style={styles.wrapper}>
      <Text> Add ToDo</Text>
      <Text>Title</Text>
        <TextInput
        style={styles.textInput} placeholder="Title" onChange={addTitle}
         value={title} />
         <Text>Description</Text>
        <TextInput 
        multiline={true}
        style={styles.textDescription}
         onChange={addDescription}
        value={description} placeholder="Description"/>
       <Text style={styles.checkBoxText}>
          <CheckBox value={publicTodo} onChange={addPublic}/>
        Public</Text>
      
        <Text style={styles.checkBoxText}>
        <CheckBox value={completed} onChange={addCompleted}/>
        Completed</Text>
        
        <Button title="Create todo" onPress={sendData}/>
    </View>
);
};

export default CreatePage;
const styles = StyleSheet.create({
  checkBoxText: {
    width: 100,
  },
  wrapper: {
    padding: 10,
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
  },
  textDescription: {
    borderColor: '#3949ab',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: 200,
  },
  checkBox: {
    display: 'flex',

  },
  textInput: {
    height: 50,
    padding: 10,
    borderColor: '#3949ab',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  label: {
    color: '#3949ab',
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
    color: '#3949ab',
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