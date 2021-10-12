import Todo from "../models/Todo"
import checkAuth from "./../middleware/auth.middleware";
class TodoService {
    async createTodo(todo: any){
        const createdTodo = await Todo.create(todo);
        return createdTodo;
       }
    async getAllTodo(owner: any){
        const todos = await Todo.find({owner});
        return todos;
    }
    async getOneTodo(id: any){
    
        if(!id){
        throw new Error("no id") 
        }
        const todo = await Todo.findById(id);
        return todo;
    }
    async updateTodo(todo: any){
        if(!todo){
            throw new Error("no id") 
        }
        const updatedTodo = await Todo.findByIdAndUpdate(todo.id, todo, {new: true});
        return updatedTodo;
        }
        async deleteTodo(id: any){
    
        if(!id){
        throw new Error("no id") 
        }
        const todo = await Todo.findByIdAndDelete(id);
        return todo;
   
        }
}
export default new TodoService()