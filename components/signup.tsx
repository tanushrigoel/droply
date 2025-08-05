"use client";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";
import { signUpSchema } from "@/schema/signup.schema";
import { useState } from "react";

export default function signUpForm() {
  const [verifying, setVerifying] = useState(false);

  const { signUp, isLoaded, setActive } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({});

  const onSubmit = async () => {};
  const handleVerificationSubmit = async () => {};
  if (verifying) {
    return <h1>This is OTP entering field </h1>;
  }
  return <h1>Signup Form with email and other fields</h1>;
}
