import {useState} from "react";
import type {NewUser} from "../types/userType";
import { putUseService} from "../services/userService";

export const usePutUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (user: NewUser, id: number) => {
    try {
      setLoading(true);
      const req = await putUseService(user, id);
      return req;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      throw new Error("Yangilashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return {mutate, loading, error};
};
