import { redirect } from "next/navigation";
import { createClient } from "../../../../lib/supabase/server";
import { SignInForm } from "@/components/auth/signin-form";

export default async function SignInPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <SignInForm />
    </div>
  );
}
