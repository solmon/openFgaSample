"use client";

import React, { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  price: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  region: string;
}

interface Order {
  id: number;
  user: User;
  createdAt: string;
  orderItems: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-gray-900 dark:text-gray-100">Loading orders...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Orders</h1>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 rounded shadow">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-gray-100">Order #{order.id} by {order.user.name} ({order.user.region})</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Order #{selectedOrder.id} Details</h2>
          <div className="mb-2 text-gray-900 dark:text-gray-100">User: {selectedOrder.user.name} ({selectedOrder.user.email})</div>
          <div className="mb-2 text-gray-900 dark:text-gray-100">Region: {selectedOrder.user.region}</div>
          <div className="mb-2 text-gray-900 dark:text-gray-100">Created: {new Date(selectedOrder.createdAt).toLocaleString()}</div>
          <h3 className="font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">Order Items</h3>
          <ul className="list-disc pl-5">
            {selectedOrder.orderItems.map((item) => (
              <li key={item.id} className="mb-1 text-gray-900 dark:text-gray-100">
                {item.product} - Qty: {item.quantity} - ${item.price}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
