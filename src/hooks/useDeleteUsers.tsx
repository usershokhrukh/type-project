import {useState} from "react";
import type {User} from "../types/userType";
import {deleteService} from "../services/userService";

export const useDeleteUsers = () => {
  const [loading, setLoading] = useState<Record<string, boolean | null | number>>({
    status: false,
    id: null,
  });
  const [error, setError] = useState<string | null>(null);

  const mutate = async (id: Pick<User, "id">) => {
    try {
      setLoading({
        status: true,
        id: id.id,
      });
      setError(null);
      const res = await deleteService(id);
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error?.message);
      }
    } finally {
      setLoading({
        status: false,
        id: null,
      });
    }
  };

  return {loading, error, mutate}
};
