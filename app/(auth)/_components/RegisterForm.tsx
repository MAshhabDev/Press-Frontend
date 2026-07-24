"use client";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { signUpAction } from "../_actions/authAction";
import { toast } from "sonner";

export function RegisterForm() {
  const [state, action, pending] = useActionState(signUpAction, false);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      toast.success(state.message || "Account created successfully!");
    }

    if (!state.success) {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            minLength={8}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            type="text"
            placeholder="Enter Your Role"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {pending ? "Registering....." : "Sign Up"}
        </Button>
      </Card>
    </form>
  );
}
