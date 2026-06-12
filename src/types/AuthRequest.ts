import type { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export type AuthParamsRequest = Request<{ id: string }> & {
  user?: {
    id: string;
  };
};
