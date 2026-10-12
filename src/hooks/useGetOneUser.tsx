import {useEffect, useState} from "react";
import type {User} from "../types/userType";
import {getOneUsers} from "../services/userService";

export const useGetOneUser = (id: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<User>();
  const res = async () => {
    setLoading(true);
    try {
      const data = await getOneUsers(id);
      setData(data);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error?.message);
      } else {
        setError("An unknown error acquired");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      res();
      setLoading(false);
      setError(null);
    }
  }, []);

  return {loading, error, data, res};
};
