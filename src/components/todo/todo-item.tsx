"use client";

import { Todo } from "@prisma/client";
import { useState } from "react";
import { deleteTodo, toggleTodo, updateTodo } from "../../../lib/actions/todos";
import { Card, CardContent } from "../ui/card";
import { Check, Edit2, Save, Trash2, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formatDate } from "../../../lib/utils";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const handleToggle = async () => {
    setIsLoading(true);
    await toggleTodo(todo.id);
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    const result = await updateTodo(todo.id, formData);

    if (result.success) {
      setIsEditing(false);
    }

    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setIsLoading(true);
      await deleteTodo(todo.id);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setIsEditing(false);
  };

  return (
    <Card className={`transition-all ${todo.completed ? "opacity-60" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`mt-1 p-1 rounded-full transition-colors ${
              todo.completed
                ? "bg-green-100 text-green-600"
                : "bt-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            <Check className="w-4 h-4" />
          </button>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Todo title"
                  className="font-medium"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleUpdate}
                    disabled={isLoading || !title.trim()}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3
                  className={`font-medium ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p
                    className={`text-sm text-gray-600 mt-1 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Created: {formatDate(new Date(todo.createdAt))}
                </p>
              </>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
