import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShieldCheck, Zap, TrendingUp, ArrowRight } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                C
              </span>
              CrediFlow
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            Bank-grade security, built in
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl">
            Loans, decided
            <br />
            <span className="text-blue-600">at the speed of trust.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
            CrediFlow brings application, underwriting, and approval into one modern platform
            so your customers wait less, and you see more.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/register">
              <Button className="gap-2 px-6 py-3 text-base">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="px-6 py-3 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative border-y border-slate-100 bg-slate-50/80">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3 lg:px-8">
            <div>
              <div className="text-3xl font-semibold text-slate-900">98.7%</div>
              <div className="mt-1 text-sm text-slate-500">Approval accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-slate-900">&lt; 2 min</div>
              <div className="mt-1 text-sm text-slate-500">Average decision time</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-slate-900">R2.1B+</div>
              <div className="mt-1 text-sm text-slate-500">Loans processed</div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-3 lg:px-8">
          <div className="text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Instant applications</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Apply in minutes with a guided flow that adapts to your financial profile.
            </p>
          </div>
          <div className="text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Secure by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Your data is encrypted end-to-end and never shared without consent.
            </p>
          </div>
          <div className="text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Track in real time</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Follow every stage of your application from submission to payout.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-400 lg:px-8">
          &copy; {new Date().getFullYear()} CrediFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
