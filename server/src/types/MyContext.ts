import { User } from "@prisma/client";
import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  user?: User | null;
}
