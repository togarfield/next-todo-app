import { CheckSquare, LogOut } from "lucide-react";
import { createClient } from "../../../lib/supabase/server";
import { signOut } from "../../../lib/actions/auth";
import { Button } from "../ui/button";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Todo App</h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-shadow-2xs text-gray-600">
                {user.email}
              </span>
              <form action={signOut}>
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-1 text-gray-600" />
                  <span className="text-gray-600">Sign Out</span>
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
