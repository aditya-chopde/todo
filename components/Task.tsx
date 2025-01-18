"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface TaskProp {
  data: Task[];
  getTasks: () => Promise<void>;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: boolean;
}

const Task: React.FC<TaskProp> = ({ data, getTasks }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false)

  const handleDeleteTask = async (id: string) => {
    try {
      setIsDeleting(true);
      await axios.post(`./api/delete/${id}`).then((res) => {
        toast.success(res.data.message);
        getTasks();
        setIsDeleting(false);
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro Occurred: " + error.message);
      } else {
        toast.error("Unknown Error Occurred");
      }
    }
  };

  async function markAsDone(id: string) {
    try {
      await axios.post(`./api/done/${id}`).then((res) => {
        setIsDone(true)
        toast.success(res.data.message);
        getTasks()
      });
    } catch (error) {}
  }

  if (!data) {
    return <div>No Tasks</div>;
  }

  return (
    <div>
      <ToastContainer theme="dark" />
      <div className="relative overflow-x-auto w-[750px] mx-auto my-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  <p
                    className={`text-center px-2 py-1 rounded-full ${
                      item.status
                        ? "bg-green-500 text-white"
                        : "bg-[#a6a6a6] text-black"
                    }`}
                  >
                    {item.status ? "Done" : "Not Done"}
                  </p>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    disabled={isDeleting}
                    className={`bg-red-600 rounded-sm text-white px-2 py-1 ${
                      isDeleting ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => handleDeleteTask(item._id)}
                  >
                    Delete
                  </button>
                  <button className="bg-yellow-500 rounded-sm text-white px-2 py-1">
                    <Link href={`/edit/${item._id}`}>Edit</Link>
                  </button>
                  <button
                  disabled={isDone}
                    className={`bg-green-500 rounded-sm text-white px-2 py-1 ${isDone?"cursor-not-allowed":"cursor-pointer"}`}
                    onClick={() => markAsDone(item._id)}
                  >
                    {item.status?"Task Done":"Mark as Done"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
