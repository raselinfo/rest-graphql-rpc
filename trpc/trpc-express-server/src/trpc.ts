import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  console.log("createContext", { req:req.body, res:res.header });
  return {};
}; 


type Context = Awaited<ReturnType<typeof createContext>>;


const t = initTRPC.context<Context>().create();

// const t=initTRPC.create()

export const router = t.router;
export const publicProcedure = t.procedure;
