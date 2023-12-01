import { z } from "zod"
import { db } from "../db"
import {publicProcedure} from "../trpc"


export const userList=publicProcedure.query(async ()=>{
    console.log("hit from userList");

    const users=await db.user.findMany()
    return users
})


export const userById=publicProcedure.input(z.number()).query(async ({input})=>{
    console.log("hit from userById")
    const user =await db.user.findById(input.toString())
    return user
})


export const createUser=publicProcedure.input(z.object({name:z.string()})).mutation(async({input})=>{
    console.log("hit from createUser");

    const user=await db.user.create({name:input.name})
    return user
})