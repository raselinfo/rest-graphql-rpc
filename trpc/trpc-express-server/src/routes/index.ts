import { userList, userById, createUser } from './user.routes';
import {router} from "../trpc"

const appRouter=router({
    userList,
    userById,
    createUser
})


export type AppRouter = typeof appRouter

export default appRouter