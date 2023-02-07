import { Middleware } from "next-api-middleware";
import { ApiError } from '../api-error';

type HttpMethod = "GET" | "POST";

export const allowedHttpMethods =
  (...methods: HttpMethod[]): Middleware =>
  async (req, res, next) => {
    if (!methods.includes(req.method as HttpMethod)) {
      throw new ApiError({
        code: 'HTTP_METHOD_NOT_ALLOWED',
        httpStatusCode: 405,
      });
    }

    return next();
  };
