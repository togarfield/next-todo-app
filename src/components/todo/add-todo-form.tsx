"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { TodoInput, todoSchema } from "../../../lib/validations/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "../../../lib/actions/todos";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function AddTodoForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (data: TodoInput) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");

    const result = await createTodo(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      reset();
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Todo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Description (optional)
            </label>
            <textarea
              id="description"
              placeholder="Add more details..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Todo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
