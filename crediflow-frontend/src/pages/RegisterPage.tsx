import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "../hooks/useAuthApi";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../components/theme/ThemeToggle";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => navigate("/dashboard"),
    });
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.24),_transparent_32%),linear-gradient(160deg,var(--surface-strong)_0%,rgba(15,23,42,0.98)_100%)]">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
            C
          </span>
          CrediFlow
        </div>

        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-300 mb-6">
            <ShieldCheck className="h-4 w-4" />
            Bank-grade security, built in
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white leading-tight">
            Loans, decided at the speed of trust.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Create an account to apply, track, and manage your loans in one modern platform.
          </p>
        </div>

        <div className="relative text-sm text-slate-400">
          &copy; {new Date().getFullYear()} CrediFlow. All rights reserved.
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[var(--text-h)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
                C
              </span>
              CrediFlow
            </div>
            <ThemeToggle />
          </div>

          <div className="mb-10 hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[var(--text-h)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
                C
              </span>
              CrediFlow
            </div>
            <ThemeToggle />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-h)]">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Get started in less than a minute.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John" {...register("name")} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input id="surname" placeholder="Doe" {...register("surname")} />
                {errors.surname && <p className="text-sm text-red-500">{errors.surname.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full gap-2" disabled={registerMutation.isPending}>
              {registerMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
