import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../api/api";
interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    try {
      const res = await fetchAllUsers();
      console.log(res);
      setUsers(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number): Promise<void> => {
    console.log(userId, "formusers");
    try {
      const res = await deleteUser({ userId });
      console.log(res);
      setUsers(users.filter((user) => user.id !== userId));
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="bg-gray-50 py-8 px-4">
      <div>
        <h1 className="text-xl text-gray-900 pb-2">Users:</h1>
      </div>
      <table className="table-auto w-full bg-white shadow rounded">
        <thead className="border-b border-gray-100">
          <tr>
            <th className="pl-6 py-6">
              <a className="flex items-center text-xs text-gray-500" href="#">
                <p>ID</p>
              </a>
            </th>
            <th>
              <a className="flex items-center text-xs text-gray-500" href="#">
                <p>Username</p>
              </a>
            </th>
            <th>
              <a className="flex items-center text-xs text-gray-500" href="#">
                <p>Email</p>
              </a>
            </th>

            <th>
              <a className="flex items-center text-xs text-gray-500" href="#">
                <p>Users since</p>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr className="text-xs bg-blue-50 border-b border-gray-100">
                <td className="pl-6 py-6 bg-blue-100">{user.id}</td>
                <td className="pl-6 capitalize">{user.username}</td>
                <td>{user.email}</td>

                <td>{user.created_at}</td>
                <td>
                  <button
                    className="border border-red-600 p-1 text-white bg-red-400 rounded-md"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete user
                  </button>
                </td>
              </tr>
            );
          })}
          {/* <tr className="text-xs border-b border-gray-100">
            <td className="pl-6 py-6 bg-blue-50">Cedric Kelly</td>
            <td className="pl-6">Javascript Developer</td>
            <td>Edinburgh</td>
            <td>22</td>
            <td>22/04/2021</td>
            <td>
              {" "}
              <button className="border border-red-600 p-1 text-white bg-red-400 rounded-md">
                Delete user
              </button>
            </td>
          </tr> */}
          {/* <tr className="text-xs bg-blue-50 border-b border-gray-100">
            <td className="pl-6 py-6 bg-blue-100">Garrett Winters</td>
            <td className="pl-6">Director</td>
            <td>San Francisco</td>
            <td>63</td>
            <td>22/04/2021</td>
            <td>
              {" "}
              <button className="border border-red-600 p-1 text-white bg-red-400 rounded-md">
                Delete user
              </button>
            </td>
          </tr>
          <tr className="text-xs">
            <td className="pl-6 py-6 bg-blue-50">Tiger Nixon</td>
            <td className="pl-6">Systen Architect</td>
            <td>San Francisco</td>
            <td>61</td>
            <td>22/04/2021</td>
            <td>
              {" "}
              <button className="border border-red-600 p-1 text-white bg-red-400 rounded-md">
                Delete user
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
