import React from "react";
import { RegisterForm } from "../_components/RegisterForm";
import Link from "next/link";

const registerPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        {/* FORM GENERIC TEXTS */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-balance">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details to get started
          </p>
        </div>

        <RegisterForm></RegisterForm>

        <p className="text-center text-sm text-muted-foreground">
          {"Already have an account? "}
          <Link
            href="/login"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default registerPage;
