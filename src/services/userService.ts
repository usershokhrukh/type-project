import axios from "axios";
import type {NewUser, User} from "../types/userType";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error("Could not get the data, error");
  }
  return await response?.data;
};

export const getOneUsers = async (id: number): Promise<User> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error("Could not get the data, error");
  }
  return await response?.data;
};
export const postUseService = async (user: NewUser): Promise<User[]> => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user,
  );

  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error("Could not post the data, error");
  }
  return await response?.data;
};

export const deleteService = async (id: Pick<User, "id">): Promise<User> => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/users/${id.id}`,
  );
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error("Could not delete the data, error");
  }
  return await response?.data
};


export const putUseService = async (user: NewUser, id: number): Promise<User> => {
  const response = await axios.put(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    user,
  );

  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error("Could not post the data, error");
  }
  return await response?.data;
};