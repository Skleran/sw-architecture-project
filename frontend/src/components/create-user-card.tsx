"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userApi, CreateUser, User } from "@/lib/users";

interface CreateUserCardProps {
  onUserCreated?: (user: User) => void;
}

export default function CreateUserCard({ onUserCreated }: CreateUserCardProps) {
  const [formData, setFormData] = useState<CreateUser>({
    username: "",
    email: "",
    password: "",
    role: "READER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newUser = await userApi.create(formData);
      console.log(newUser);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "READER",
      });

      setIsOpen(false);

      if (onUserCreated) {
        onUserCreated(newUser);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setError(null);

    setFormData({
      username: "",
      email: "",
      password: "",
      role: "READER",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-full hover:cursor-pointer hover:bg-sidebar/50 border rounded-lg hover:shadow-md transition-all bg-sidebar flex items-center justify-center">
          <Plus size={30} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
          </DialogHeader>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                name="username"
                placeholder="random123"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                placeholder="random123@random.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="READER">READER</option>
                <option value="AUTHOR">AUTHOR</option>
                <option value="EDITOR">EDITOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
