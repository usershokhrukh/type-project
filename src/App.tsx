import {useGetUsers} from "./hooks/useGetUsers";
import "./App.css";
import {useEffect, useState} from "react";
import type {NewUser} from "./types/userType";
import {usePostUsers} from "./hooks/usePostUser";
import {useDeleteUsers} from "./hooks/useDeleteUsers";
import {useGetOneUser} from "./hooks/useGetOneUser";
import {usePutUsers} from "./hooks/usePutUsers";
const App = () => {
  const {data, loading, error} = useGetUsers();
  const {mutate, loading: postLoading, error: postError} = usePostUsers();

  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.name || !formData?.email) {
      return alert("Fill inputs!");
    }
    try {
      const res = await mutate(formData);
      setFormData({
        name: "",
        email: "",
      });
      console.log(res);
    } catch (err) {
      return alert(`something wrong happened!\n${err}`);
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (postError) {
      console.log(postError);
    }
  }, [postError]);

  const {
    loading: deleteLoading,
    error: deleteError,
    mutate: deleteMutate,
  } = useDeleteUsers();

  useEffect(() => {
    if (deleteError) {
      console.log(deleteError);
    }
  }, [deleteError]);

  const [modal, setModal] = useState<boolean>(false);
  const [oneId, setOneId] = useState<number>(0);
  const {
    loading: oneLOading,
    error: oneError,
    data: oneData,
    res,
  } = useGetOneUser(oneId);

  useEffect(() => {
    if (oneError) {
      console.log(oneError);
    }
  }, [oneError]);

  const [oneInput, setOneInput] = useState<NewUser>({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (oneData?.name && oneData?.email) {
      setOneInput({
        name: oneData?.name,
        email: oneData?.email,
      });
    } else {
      setOneInput({
        name: "",
        email: "",
      });
    }
  }, [oneData]);

  useEffect(() => {
    if(oneId) {
      res();
    }
  }, [modal]);

  const {
    loading: putLoading,
    error: putError,
    mutate: putMutate,
  } = usePutUsers();

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oneInput?.name || !oneInput?.email) {
      return alert("Fill inputs!");
    }
    try {
      const res = await putMutate(oneInput, oneId);
      setModal(false);
      alert("Successfully changed!");
      console.log(res);
    } catch (err) {
      return alert(`something wrong happened!\n${err}`);
    }
  };

  useEffect(() => {
    if (putError) {
      console.log(putError);
    }
  }, [putError]);
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          disabled={postLoading}
          value={formData?.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
          className="input"
          type="text"
          placeholder="Name:"
        />
        <input
          disabled={postLoading}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });
          }}
          value={formData?.email}
          className="input"
          type="email"
          placeholder="Email:"
        />

        <button disabled={postLoading} className="button" type="submit">
          {postLoading ? "loading..." : "send"}
        </button>
      </form>
      {loading ? (
        "loading..."
      ) : (
        <table className="cards">
          <thead className="cars-head">
            <tr className="cards-row">
              <th>name & username</th>
              <th>email & phone</th>
              <th>website</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(({email, name, phone, username, website, id}) => (
              <tr className="cards-item">
                <td className="cards-item-box">
                  <h1 className="title">{name}</h1>
                  <p className="txt">{username}</p>
                </td>
                <td className="cards-item-box">
                  <h1 className="title">{email}</h1>
                  <p className="txt">{phone}</p>
                </td>
                <td className="cards-item-box">
                  <h1 className="title">{website}</h1>
                </td>
                <td className="cards-item-box">
                  <div className="cards-box">
                    <button
                      onClick={() => {
                        deleteMutate({id});
                      }}
                      className="cards-act cards-act-delete"
                    >
                      {id == deleteLoading?.id && deleteLoading?.status
                        ? "deleting..."
                        : "delete"}
                    </button>
                    <button
                      onClick={() => {
                        setModal(true);
                        setOneId(id);
                      }}
                      className="cards-act cards-act-edit"
                    >
                      edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal ? (
        <div className="modal">
          <form onSubmit={handleEdit} className="modal-form">
            <input
              disabled={oneLOading || putLoading}
              className="input"
              type="text"
              placeholder="Name:"
              value={oneInput?.name}
              onChange={(e) => {
                setOneInput({...oneInput, name: e.target.value});
              }}
            />
            <input
              disabled={oneLOading || putLoading}
              className="input"
              type="email"
              placeholder="Email: "
              value={oneInput?.email}
              onChange={(e) => {
                setOneInput({...oneInput, email: e.target.value});
              }}
            />
            <div className="modal-box">
              <button
                disabled={oneLOading || putLoading}
                className="modal-button"
                type="submit"
              >
                {oneLOading
                  ? "loading..."
                  : putLoading
                    ? "changing..."
                    : "change"}
              </button>
              <button
                disabled={putLoading}
                onClick={() => {
                  setModal(false);
                }}
                className="modal-button modal-close"
                type="button"
              >
                close
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default App;
