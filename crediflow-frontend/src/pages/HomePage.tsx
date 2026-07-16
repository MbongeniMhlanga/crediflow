import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShieldCheck, Zap, TrendingUp, ArrowRight } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold">
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

      {/* Hero */}
      <main className="relative overflow-hidden">
        {/* soft glow behind headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            Bank-grade security, built in
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
            Loans, decided
            <br />
            <span className="text-blue-600">at the speed of trust.</span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-lg text-gray-500 leading-relaxed">
            CrediFlow brings application, underwriting, and approval into one
            modern platform — so your customers wait less, and you see more.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/register">
              <Button className="px-6 py-3 text-base gap-2">
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

        {/* Stats strip */}
        <div className="relative border-y border-gray-100 bg-gray-50/60">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-semibold text-gray-900">98.7%</div>
              <div className="mt-1 text-sm text-gray-500">Approval accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-gray-900">&lt; 2 min</div>
              <div className="mt-1 text-sm text-gray-500">Average decision time</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-gray-900">R2.1B+</div>
              <div className="mt-1 text-sm text-gray-500">Loans processed</div>
            </div>
          </div>
        </div>

        {/* Feature row */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Instant applications</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Apply in minutes with a guided flow that adapts to your
                financial profile.
              </p>
            </div>
            <div className="text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Secure by design</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Your data is encrypted end-to-end and never shared without
                consent.
              </p>
            </div>
            <div className="text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Track in real time</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Follow every stage of your application from submission to
                payout.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} CrediFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};