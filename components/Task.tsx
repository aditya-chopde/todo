import React from "react";

const Task = () => {
  return (
    <div>
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Drink Water
              </th>
              <td className="px-6 py-4">
                3 Glasses
              </td>
              <td className="px-6 py-4">
                Not Done
              </td>
              <td className="px-6 py-4 flex gap-3">
                <button className="bg-red-500 rounded-sm text-white px-2 py-1">Delete</button>
                <button className="bg-yellow-500 rounded-sm text-white px-2 py-1">Edit</button>
                <button className="bg-green-500 rounded-sm text-white px-2 py-1">Marks as Done</button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
