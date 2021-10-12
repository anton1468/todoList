/* eslint-disable eol-last */
import axios from 'axios';
const host = `http://localhost:5000`;
class TodoHttpService {
  getTodoList = async () => {
    try {
      const res = await axios.get(`${host}/todos`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  getTodo = async (id: string) => {
    try {
      const res = await axios.get(`${host}/todos/${id}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  createTodo = async (form: object) => {
    try {
      axios.post(`${host}/todos`, { ...form });
    } catch (e) {
      console.log(e);
    }
  };

  deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${host}/todos/${id}`, { data: id });
    } catch (e) {
      console.log(e);
    }
  };

  editTodo = async (id: string, form:any) => {
    try {
      await axios.put(`${host}/todos/${id}`, { ...form });
    } catch (e) {
      console.log(e);
    }
  };
}

const httpService = new TodoHttpService();

export default httpService;