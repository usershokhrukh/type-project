import {useEffect, useState} from "react";
import type {User} from "../types/userType";
import {getAllUsers} from "../services/userService";

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