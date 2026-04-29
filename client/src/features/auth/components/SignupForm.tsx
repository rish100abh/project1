import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { signupSchema, type SignupFormData } from "../schemas/authSchema";

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormData) => {
    try {
      setApiError("");
      await signup(values);
      navigate("/dashboard");
    } catch (error: unknown) {
      const apiMessage = (error as any)?.response?.data?.message;
      const message =
        apiMessage ?? (error instanceof Error ? error.message : "Signup failed");
      setApiError(message);
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
      <h1>Create account</h1>
      <p>Sign up to manage your projects securely.</p>

      <Input
        label="Full name"
        type="text"
        placeholder="Rishabh Yadav"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create password"
        error={errors.password?.message}
        {...register("password")}
      />

      {apiError ? <p className="form-error">{apiError}</p> : null}

      <Button type="submit" loading={isSubmitting}>
        Create account
      </Button>

      <p className="switch-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}