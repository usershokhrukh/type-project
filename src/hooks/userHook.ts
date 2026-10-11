import {useEffect, useState} from "react";
import type {NewUser, User} from "../types/userType";
import {getAllUsers, postUseService} from "../services/userService";

export const useGetUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const res = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setData(data);
      } catch (error) {
        setLoading(false)
        if (error instanceof Error) {
          setError(error?.message);
        } else {
          setError("An unknown error acquired");
        }
      } finally {
        setLoading(false);
      }
    };

    res();
  }, []);

  return {loading, error, data};
};

export const usePostUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (user: NewUser) => {
    try {
      setLoading(true);
      const req = await postUseService(user);
      return req;
    } catch (err: any) {
      setLoading(false)
      setError(err.message);
      throw new Error("Qoshishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return {mutate, loading, error};
};
