/* eslint-disable eol-last */
import TodoService from './../service/todo.service';
export interface ITodoBody {
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleted: boolean;
}
export interface ITodo extends ITodoBody{
    _id: string,
}
export type ITodoService = TodoService