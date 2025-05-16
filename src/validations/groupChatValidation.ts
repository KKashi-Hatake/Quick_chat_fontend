import { title } from "process";
import {z} from "zod";


export const createChatSchema = z
.object({
    title:z.string().min(4, {message:"Chat title must be 4 characters long."}).max(190, {message:"Chat title must be 190 characters long."}),
    passcode:z.string().min(4, {message:"Passcode must be 4 characters long."}).max(25, {message:"PAsscode must be less than 25 characters."})
}).required();


export type createChatSchemaType = z.infer<typeof createChatSchema>
