import React from "react";

type Props = {};

const AllOrders = (props: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Product name
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              UserId
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Web Developer
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              $120,000
            </td>
            <td className="whitespace-nowrap px-4 py-2">
              <a
                href="#"
                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Edit status
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
