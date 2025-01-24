import { User, UsersResponse } from "../types/users";
import { http } from "./tasks";

export const url = "https://dummyjson.com/users";
export async function getAllUsers() {
  try {
    const users: User[] = [];
    const res: UsersResponse = await http<UsersResponse>(url);
    console.log(res);
    users.push(...res.users);
    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
}
