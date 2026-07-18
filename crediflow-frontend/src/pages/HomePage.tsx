import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/theme/ThemeToggle";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_30%),linear-gradient(180deg,var(--bg)_0%,var(--bg)_100%)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] bg-[var(--bg-elevated)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[var(--text-h)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
              C
            </span>
            CrediFlow
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
            <ShieldCheck className="h-4 w-4" />
            Bank-grade security, built in
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight text-[var(--text-h)] sm:text-6xl">
            Loans, decided
            <br />
            <span className="text-[var(--accent)]">at the speed of trust.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
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

        <div className="relative border-y border-[var(--border)] bg-[var(--surface)]/70">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3 lg:px-8">
            <div>
              <div className="text-3xl font-semibold text-[var(--text-h)]">98.7%</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Approval accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-[var(--text-h)]">&lt; 2 min</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Average decision time</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-[var(--text-h)]">R2.1B+</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Loans processed</div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-3 lg:px-8">
          <div className="text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-accent)] text-[var(--accent)]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-[var(--text-h)]">Instant applications</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Apply in minutes with a guided flow that adapts to your financial profile.
            </p>
          </div>
          <div className="text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-accent)] text-[var(--accent)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-[var(--text-h)]">Secure by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Your data is encrypted end-to-end and never shared without consent.
            </p>
          </div>
          <div className="text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-accent)] text-[var(--accent)]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-[var(--text-h)]">Track in real time</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Follow every stage of your application from submission to payout.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[var(--muted)] lg:px-8">
          &copy; {new Date().getFullYear()} CrediFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
