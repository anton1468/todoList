import { check } from "express-validator/check"
import { Response } from "express"

class Validator {
  createTodoValidator = () => {
    return [
      check("title", "sorry, no title").not().isEmpty(),
      check("description", "sorry, no description").not().isEmpty(),
    ]
  }

  requestValidator = async (res: Response, callback: Function) => {
    try {
      const result = await callback()
      res.status(200).send(result)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}

const validator = new Validator()
export default validator