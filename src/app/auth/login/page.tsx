"use client";

import React from "react";
import { AuthHero } from "./components/AuthHero";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <AuthHero />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
