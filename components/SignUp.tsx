"use client";

import { useState } from "react";
import { signUp } from "../utils/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError type

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert("Sign-up successful!");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message); // Firebase-specific error message
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default SignUp;
