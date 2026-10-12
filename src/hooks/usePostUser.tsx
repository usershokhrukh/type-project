import {useState} from "react";
import type {NewUser} from "../types/userType";
import {postUseService} from "../services/userService";

export const usePostUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (user: NewUser) => {
    try {
      setLoading(true);
      const req = await postUseService(user);
      return req;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      throw new Error("Qoshishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return {mutate, loading, error};
};
