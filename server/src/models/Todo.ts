import { Document, PaginateModel, model, Schema, Types } from "mongoose"
import { mongoosePagination } from "ts-mongoose-pagination";

/**
 * Interface to model the toDo Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param year:number
 * @param isPublic:boolean
 * @param isCompleted:boolean
 * @param userId:string
 * 
 */
export interface ITodo extends Document {
  title: string
  description: string
  year: Date
  isPublic: boolean
  isCompleted: boolean
  owner: string
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: String
  },
})
const Todo: PaginateModel<ITodo> = model("Todo", todoSchema)

export default Todo