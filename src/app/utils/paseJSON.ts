import { RequestHandler} from "express";

const parseJSON: RequestHandler = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  next();
};

export default parseJSON;
