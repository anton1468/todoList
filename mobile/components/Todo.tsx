/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, CheckBox } from 'react-native';
import { TodoProps } from '../models/types';
import { useHttp } from './../hooks/http.hook';
import { useToast } from 'react-native-toast-notifications';
import { AuthContext } from './../context/AuthContext';


const Todo = ({ todo, deleteTodo, acceptEdit }) => {
  const auth = useContext(AuthContext);
  const toast = useToast();
  const { request } = useHttp();
  const { title, description, isCompleted, isPublic, _id } = todo;
  const [completed, setCompleted] = useState(isCompleted);
  const [privacy, setPrivacy] = useState(isPublic);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(' ');
  const [newDescription, setNewDescription] = useState(' ');
  const [changeProperty, setChangeProperty] = useState(false);
  const editTodo = () => {
    setEdit(!edit);
    setChangeProperty(!changeProperty);
  };
  const addTitle = (event: any) => {
    setNewTitle(event.target.value);
  };
  console.log(_id, isPublic, isCompleted);
  const addDescription = (event: any) => {
    setNewDescription(event.target.value);
  };
  const putHandler = async () => {
    acceptEdit();
    setChangeProperty(!changeProperty);
    setEdit(!edit);
    try {
      const initialData = {
        title: newTitle,
        description: newDescription,
        isCompleted: isCompleted,
        isPublic: isPublic,
        owner: auth.userId,
        id: _id,
      };
      console.log(initialData);
      await request(`http://localhost:5000/api/todos/${_id}`, 'PUT', initialData);
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' });
    };
  };

  return (
    <View style={changeProperty ? styles.itemBig : styles.item } key={_id}>
      <View style={changeProperty ? styles.mainBig : styles.main}>
        <View style={styles.header}>
          {edit ? <TextInput style={styles.textInput} placeholder="Change title" onChange={addTitle}/> : <Text style={styles.title}>{title}</Text> } 
        </View>
        {edit ? <TextInput style={styles.textInputDescription} multiline={true} placeholder="Change desc" onChange={addDescription} /> : <Text>{description}</Text>}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{isCompleted ? 'Completed' : 'Not Completed'}</Text>
          {changeProperty ? null : <CheckBox onChange={() => setCompleted(!completed)}/>}
          <Text style={styles.footerText}>{isPublic ? 'Public' : 'Private'}</Text>
          {changeProperty ? null : <CheckBox onChange={() => setPrivacy(!privacy)}/>}
        </View>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity >
          {changeProperty ? <Text style={styles.button} onPress={editTodo}>Close edit</Text> : <Text style={styles.button} onPress={editTodo}>Edit</Text> }
        </TouchableOpacity>
        {changeProperty ? <TouchableOpacity onPress={putHandler} disabled={edit ? false : true}>
          <Text style={styles.button}>Accept</Text>
        </TouchableOpacity> : null }
        <TouchableOpacity onPress={() => deleteTodo(_id)}>
          <Text style={styles.button}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#dbdbdb',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
  },
  textInput: {
    height: 50,
    width: 250,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#3949ab',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  textInputDescription: {
    height: 250,
    width: 250,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#3949ab',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  itemBig: {
    backgroundColor: '#dbdbdb',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  header: {

  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3949ab',
    marginBottom: 10,
    flexDirection: 'row',
  },
  main: {
    alignItems: 'flex-start',
    flex: 2,
  },
  mainBig: {
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
  },
  footerText: {
    marginRight: 7,
  },
  button: {
    color: '#3949ab',
    fontWeight: '700',
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3949ab',
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});
