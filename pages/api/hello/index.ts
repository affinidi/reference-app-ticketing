import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { use } from "next-api-middleware";
import { allowedHttpMethods } from "../middlewares/allowed-http-methods";
import { errorHandler } from "../middlewares/error-handler";

type HandlerResponse = {
  message: string;
};

const requestSchema = z
  .object({
    name: z.string(),
  })
  .strict();

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const { name } = requestSchema.parse(req.body);

  res.status(200).json({ message: `Hello, ${name}!` });
}

export default use(allowedHttpMethods("POST"), errorHandler)(handler);
