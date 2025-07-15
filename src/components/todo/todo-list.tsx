"use client";

import { Todo } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No todos yet. Add one above!</p>
        </CardContent>
      </Card>
    );
  }

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-6">
      {pendingTodos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Pending ({pendingTodos.length})
          </h2>
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Completed ({completedTodos.length})
          </h2>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
