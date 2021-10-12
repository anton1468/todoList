import Todo from './../models/Todo'
import TodoService from './../services/todo.service';
class TodoController {
    async createTodo(req: Request, res: Response){
            try {
                
                const todo = await TodoService.createTodo(req.body)
                res.json(todo)
            } catch (e) {
                res.status(500).json(e)
            }
    
}
    async getAllTodo(req: Request, res: Response){
        try {
            const todos = await TodoService.getAllTodo(req.params.owner);
            return res.json(todos)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOneTodo(req: Request, res: Response){
        try {
            const todo = await TodoService.getOneTodo(req.params.id);
            return res.json(todo)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async updateTodo(req: Request, res: Response){
        try {
            
            const updatedTodo = await TodoService.updateTodo(req.body)
            return res.json(updatedTodo);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async deleteTodo(req: Request, res: Response){
        try {
            
            const todo = await TodoService.deleteTodo(req.params.id)
            return res.json(todo)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new TodoController();