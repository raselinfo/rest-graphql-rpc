import { z } from "zod";
import { db } from "./db";
import { router, publicProcedure } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),

  userById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await db.user.findById(input);
    return user;
  }),

  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.create({ name: input.name });
      return user;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(4000);
console.log("TRPC server is running on port 4000");
