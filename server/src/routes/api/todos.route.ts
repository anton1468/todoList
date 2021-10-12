import { Router } from "express";
import TodoController from "../../controllers/todo.controller";
import checkAuth from './../../middleware/auth.middleware'


const todosRouter: Router = Router();

todosRouter.post('/',  TodoController.createTodo);
todosRouter.get('/:owner', TodoController.getAllTodo);
todosRouter.get('/:id', TodoController.getOneTodo);
todosRouter.put('/:id', TodoController.updateTodo);
todosRouter.delete('/:id', TodoController.deleteTodo);


export default todosRouter;