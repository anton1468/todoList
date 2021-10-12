import { Response } from "express";
class ResponseCheck {
  createSuccessResponse = async (res: Response, func: Function) => {
  try {
      const data = await func();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
const responseCheck = new ResponseCheck();
export default responseCheck;