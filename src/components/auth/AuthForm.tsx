"use client";

import { useUser } from "@/contexts/user";
import InputWLabel from "../InputWLabel";
import { useState } from "react";

export default function AuthForm() {
  const user = useUser();

  const [email, setEmail] = useState("jonatan.vahlberg+sb1@willandskill.se");
  const [password, setPassword] = useState("123123abc");
  return (
    <div>
      <InputWLabel
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputWLabel
        label="Password"
        type="password"
        placeholder="******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        onClick={(e) => {
            user.actions.login(email, password)
        }}
      >
        login
      </button>
    </div>
  );
}
