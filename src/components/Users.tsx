import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../api/api";
interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const Users: React.FC = () => {
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
    <section className="px-4 py-8 bg-gray-50">
      <div>
        <h1 className="pb-2 text-xl text-gray-900">Users:</h1>
      </div>
      <table className="w-full bg-white rounded shadow table-auto">
        <thead className="border-b border-gray-100">
          <tr>
            <th className="py-6 pl-6">
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
              <tr className="text-xs border-b border-gray-100 bg-blue-50" key={user.id}>
                <td className="py-6 pl-6 bg-blue-100">{user.id}</td>
                <td className="pl-6 capitalize">{user.username}</td>
                <td>{user.email}</td>

                <td>{user.created_at}</td>
                <td>
                  <button
                    className="p-1 text-white bg-red-400 border border-red-600 rounded-md"
                    onClick={() => handleDeleteUser(user.id)}>
                    Delete user
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
