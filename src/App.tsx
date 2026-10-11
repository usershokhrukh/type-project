import {useGetUsers, usePostUsers} from "./hooks/userHook";
import "./App.css";
import {useEffect, useState} from "react";
import type {NewUser} from "./types/userType";
const App = () => {
  const {data, loading, error} = useGetUsers();
  const {mutate, loading: postLoading, error: postError} = usePostUsers();

  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: ""
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
      console.log(err);
      return alert(`something wrong happened!\n${err}`);
    }
  };

  console.log(postLoading);
  useEffect(() => {
    console.log(error);
  }, [error]);
  useEffect(() => {
    console.log(postError);
  }, [postError]);

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
            </tr>
          </thead>
          <tbody>
            {data?.map(({email, name, phone, username, website}) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
