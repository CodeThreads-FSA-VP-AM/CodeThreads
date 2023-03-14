import React, { useEffect, useState } from "react";
import { fetchOrders } from "../api/api";
import CompletedSteps from "./ComepletedSteps";

type Props = {
  allOrders: any;
  setAllOrders: any;
};
interface Order {
  title: string;
  status: string;
  price: number;
  users_id: number;
}

const AllOrders = (props: Props) => {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl text-gray-900 pb-2">Order records:</h1>
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
          {props.allOrders.map((allOrder: Order) => {
            return (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">
                  {allOrder.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">
                  {allOrder.status}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {allOrder.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {allOrder.users_id}
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
            );
          })}
        </tbody>
      </table>
      <CompletedSteps />
    </div>
  );
};

export default AllOrders;
