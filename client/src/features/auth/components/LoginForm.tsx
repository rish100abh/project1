import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/authSchema";
import { useState } from "react";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      setApiError("");
      await login(values);
      navigate("/dashboard");
    } catch (error: unknown) {
      const apiMessage = (error as any)?.response?.data?.message;
      const message =
        apiMessage ?? (error instanceof Error ? error.message : "Login failed");
      setApiError(message);
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
      <h1>Welcome back</h1>
      <p>Login to access your dashboard.</p>

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
        placeholder="Enter password"
        error={errors.password?.message}
        {...register("password")}
      />

      {apiError ? <p className="form-error">{apiError}</p> : null}

      <Button type="submit" loading={isSubmitting}>
        Login
      </Button>

      <p className="switch-text">
        Don’t have an account? <Link to="/signup">Create one</Link>
      </p>
    </form>
  );
}