import { Req, Res } from "../types.js";

const asyncWrapper = (routeFn: (req: Req, res: Res) => Promise<void | Res>) => {
  const wrappedFn: typeof routeFn = async (req, res) => {
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