import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { User } from "../entities";

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  user: User | null;
};
