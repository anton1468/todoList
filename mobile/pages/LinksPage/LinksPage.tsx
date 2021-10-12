// eslint-disable-next-line quotes
import React, { useState, useEffect } from "react";
import { useHttp } from '../../hooks/http.hook';
import { useToast } from 'react-native-toast-notifications';
import { View, FlatList } from 'react-native';
import Todo from '../../components/Todo';


const LinksPage = ( ) => {
  const toast = useToast();
  const { request } = useHttp();
  const [allTodos, setAllTodos] = useState(' ');
  const [deleteItem, setDeleteItem] = useState(false);
  const [acceptEdit, setAcceptEdit] = useState(false);
  const storage = JSON.parse(localStorage.getItem('userData'));
  console.log(storage.userId);
  const handleEdit = () => {
    setAcceptEdit(!acceptEdit);
  };
  useEffect(() => {
    const allTodos = async () => {
      try {
        const data = await request(`http://localhost:5000/api/todos/${storage.userId}`, 'GET');
        console.log(data);
        setAllTodos(data);
      } catch (error: any) {
        toast.show(error.message, { type: 'danger' });
      };
    };
    allTodos();
  }, [deleteItem, handleEdit]);
  const deleteTodo = async (id: any) => {
    try {
      await request(`http://localhost:5000/api/todos/${id}`, 'DELETE');
      setDeleteItem(!deleteItem);
    } catch (error: any) {
      toast.show(error.message, { type: 'danger' });
    };
  };
  
  return (
    <View>
      <FlatList
        data={allTodos}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({ item }) => <Todo
          todo={item}
          deleteTodo={deleteTodo}
          acceptEdit={handleEdit}
        />}
      />
    </View>
  );
};

export default LinksPage;
