import { User, UsersResponse } from "../types/users";
import { http } from "./tasks";

export const url = "https://dummyjson.com/users";
export async function getAllUsers() {
  try {
    const users: User[] = [];
    const res: UsersResponse = await http<UsersResponse>(url);
    users.push(...res.users);
    return users;
  } catch (error) {
    console.log(error);
  }
}
