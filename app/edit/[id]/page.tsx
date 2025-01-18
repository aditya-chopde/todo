"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EnterTask = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();

  async function getSingleData() {
    try {
      await axios.get(`../api/single/${id}`).then((res) => {
        setTitle(res.data.task.title);
        setDescription(res.data.task.description);
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error Occurred: " + error.message);
      } else {
        toast.error("Unknown Error Occurred");
      }
    }
  }

  async function handleEditTask(e: FormEvent) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const formData: { title: string; description: string } = {
        title,
        description,
      };
      await axios
        .post(`../api/edit/${id}`, formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          setTitle("");
          setDescription("");
          toast.success(res.data.message);
          setIsSubmitting(false);
          router.push("/");
        });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro Occurred: " + error.message);
      } else {
        toast.error("Unknown Error Occurred");
      }
    }
  }

  useEffect(() => {
    setIsLoaded(true);
    getSingleData();
  }, []);

  if (!isLoaded) {
    return <div className="text-center my-10">Loading...</div>;
  }
  return (
    <>
      <form className="max-w-md mx-auto my-10" onSubmit={handleEditTask}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Task
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-`blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Description
          </label>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            isSubmitting ? "cursor-not-allowed bg-blue-500" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Editing..." : "Edit"}
        </button>
      </form>
    </>
  );
};

export default EnterTask;
