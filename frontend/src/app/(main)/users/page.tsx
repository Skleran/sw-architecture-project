"use client";
import React, { useState, useEffect } from "react";
import { userApi, User } from "@/lib/users";
import CreateUserCard from "@/components/create-user-card";
import UserDropdown from "@/components/user-dropdown";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  const handleUserCreated = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.userId}
            className="bg-sidebar border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Link href={`${user.username}`}>
                <h2 className="text-xl font-semibold ">{user.username}</h2>
              </Link>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "ADMIN"
                    ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-600"
                    : user.role === "EDITOR"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-600"
                    : user.role === "AUTHOR"
                    ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-600"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <span className="font-medium">ID:</span> {user.userId}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
              <UserDropdown userId={user.userId} onDeleted={fetchUsers} />
            </div>
          </div>
        ))}
        <CreateUserCard onUserCreated={handleUserCreated} />
      </div>

      {users.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No users found.
        </div>
      )}
    </div>
  );
}
