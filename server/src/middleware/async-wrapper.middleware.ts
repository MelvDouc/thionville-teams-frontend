import { Handler } from "../types.js";

const asyncWrapper = (routeFn: Handler): Handler => {
  const wrappedFn: Handler = async (req, res) => {
    try {
      return await routeFn(req, res);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  };

  return wrappedFn;
};

export default asyncWrapper;