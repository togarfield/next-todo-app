import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { prisma } from "../../lib/prisma";
import { MainLayout } from "@/components/layout/main-layout";
import { AddTodoForm } from "@/components/todo/add-todo-form";
import { TodoList } from "@/components/todo/todo-list";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">Manage your todos and stay organized</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <AddTodoForm />
          </div>

          <div className="md:col-span-2">
            <TodoList todos={todos} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
