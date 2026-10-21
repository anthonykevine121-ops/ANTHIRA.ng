import React, { useState } from 'react';
import { AnthiraLogo } from './VexoraLogo';
import { AuthUser } from '../types';
import { getSupabaseClient, toAuthUser } from '../lib/supabase';
import { 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onSuccess: (user: AuthUser) => void;
  onBackToStore: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onSuccess,
  onBackToStore
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRemember, setLoginRemember] = useState(true);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Password strength calculation for sign up
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 - 4
  };

  const strength = calculateStrength(signupPassword);

  const getStrengthLabel = (score: number) => {
    if (score === 0) return { label: 'Empty', color: 'bg-zinc-700', text: 'text-zinc-500' };
    if (score === 1) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
    if (score === 3) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
  };

  const strengthInfo = getStrengthLabel(strength);

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    setError(`${provider} sign-in is not configured. Use an email account instead.`);
  };

  // Submit Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!loginEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!loginPassword) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: authError } = await getSupabaseClient().auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword
      });
      if (authError) throw authError;
      if (!data.user || !data.session) {
        throw new Error('Sign-in did not return an authenticated account. Please try again.');
      }
      onSuccess(toAuthUser(data.user));
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Sign Up
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!signupName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match. Please verify and try again.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the ANTHIRA terms of service to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: authError } = await getSupabaseClient().auth.signUp({
        email: signupEmail.trim(),
        password: signupPassword,
        options: {
          data: { full_name: signupName.trim() }
        }
      });
      if (authError) throw authError;
      if (!data.user) throw new Error('Could not create the account. Please try again.');
      if (data.session) {
        await getSupabaseClient().auth.signOut();
        throw new Error('Email verification is not enabled. Please contact the site administrator.');
      }
      setAwaitingVerification(true);
      setError(null);
      setNotice('A verification code has been sent. Enter it here to finish creating your account.');
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to create the account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setIsSubmitting(true);
    try {
      const { data, error: authError } = await getSupabaseClient().auth.verifyOtp({
        email: signupEmail.trim(),
        token: verificationCode.trim(),
        type: 'signup'
      });
      if (authError) throw authError;
      if (!data.user || !data.session) {
        throw new Error('Email verification did not complete. Please request a new code.');
      }
      onSuccess(toAuthUser(data.user));
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to verify the email. Check the code and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    setError(null);
    setNotice(null);
    setIsSubmitting(true);
    try {
      const { error: authError } = await getSupabaseClient().auth.resend({
        type: 'signup',
        email: signupEmail.trim()
      });
      if (authError) throw authError;
      setNotice('A new verification code has been sent.');
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to resend the verification code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot password handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setError(null);
    try {
      const { error: resetError } = await getSupabaseClient().auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo: window.location.origin
      });
      if (resetError) throw resetError;
      setResetSent(true);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Unable to send the password reset email.');
      return;
    }
    window.setTimeout(() => {
      setForgotPasswordOpen(false);
      setResetSent(false);
      setResetEmail('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#090b0f] text-white flex flex-col justify-between selection:bg-[#ff5722] selection:text-white">
      {/* Top Navbar Header */}
      <header className="w-full border-b border-white/10 bg-[#0d0f14]/80 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <span>Back to Store</span>
          </button>

          <div className="cursor-pointer" onClick={onBackToStore}>
            <AnthiraLogo size="md" />
          </div>

          <div className="text-xs text-zinc-400 hidden sm:flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Secure 256-Bit SSL Auth</span>
          </div>
        </div>
      </header>

      {/* Main Authentication Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero / Trust Column (Visible on Desktop) */}
          <div className="lg:col-span-5 space-y-6 hidden lg:block pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff5722] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANTHIRA Developer & Customer Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              One account for templates, custom projects, & licensing.
            </h1>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Sign in to download purchased source code, manage custom web agency requests, receive invoices, and access 24/7 technical customer support.
            </p>

            {/* Value Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant Code Delivery</h4>
                  <p className="text-[11px] text-zinc-400">Download clean production code repositories (.zip) anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Commercial Rights & Certificates</h4>
                  <p className="text-[11px] text-zinc-400">Official commercial usage licenses included with every purchase.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Client Project Management</h4>
                  <p className="text-[11px] text-zinc-400">Track milestones for bespoke Nigeria and international web developments.</p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs space-y-2">
              <p className="italic text-zinc-300 leading-relaxed">
                "Creating my ANTHIRA account gave me instant access to my Restaurant and Store templates with full source files. Setup took minutes!"
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center font-bold text-[10px] text-white">
                  AK
                </div>
                <div>
                  <span className="font-semibold text-white">Anthony Kevine</span>
                  <span className="text-zinc-500 text-[10px] ml-1.5">Lagos, Nigeria 🇳🇬</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-7 max-w-md w-full mx-auto">
            <div className="relative rounded-2xl bg-[#131720]/95 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Card Header & Tab Switcher */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {awaitingVerification
                        ? 'Verify your email'
                        : mode === 'login'
                          ? 'Sign In to ANTHIRA'
                          : 'Create an Account'}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      {awaitingVerification
                        ? `Enter the verification code sent to ${signupEmail}.`
                        : mode === 'login'
                          ? 'Enter your credentials to access your dashboard'
                          : 'Get started with free lifetime downloads and support'}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-[#ff5722]/15 text-[#ff5722] border border-[#ff5722]/30 font-bold">
                    {awaitingVerification ? 'Verify' : mode === 'login' ? 'Member' : 'New User'}
                  </span>
                </div>

                {/* Tab Switcher Pills */}
                {!awaitingVerification && <div className="grid grid-cols-2 p-1 rounded-xl bg-black/40 border border-white/5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setAwaitingVerification(false);
                      setError(null);
                      setNotice(null);
                    }}
                    className={`py-2 rounded-lg transition-all ${
                      mode === 'login'
                        ? 'bg-[#ff5722] text-white shadow-md shadow-orange-500/25'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setAwaitingVerification(false);
                      setError(null);
                      setNotice(null);
                    }}
                    className={`py-2 rounded-lg transition-all ${
                      mode === 'signup'
                        ? 'bg-[#ff5722] text-white shadow-md shadow-orange-500/25'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>}
              </div>

              {/* Social providers are disabled; only verified email accounts can sign in. */}
              <div className="hidden">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-200 hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('GitHub')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-200 hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <span className="relative bg-[#131720] px-3 text-[11px] uppercase font-mono text-zinc-500">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}
              {notice && (
                <div role="status" className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  {notice}
                </div>
              )}

              {/* ===================== SIGN IN FORM ===================== */}
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. anthonykevine121@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(true)}
                        className="text-[11px] text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={loginRemember}
                        onChange={(e) => setLoginRemember(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#ff5722] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#ff5722]"
                      />
                      <span>Keep me signed in</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:from-[#f4511e] hover:to-[#ff5722] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </span>
                    ) : awaitingVerification ? (
                      <form onSubmit={handleVerifyEmail} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                            Email verification code
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter the 6-digit code"
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-center text-lg tracking-[0.4em] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
                            maxLength={6}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || verificationCode.length !== 6}
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? 'Verifying...' : 'Verify email and create account'}
                        </button>
                        <div className="flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setAwaitingVerification(false);
                              setVerificationCode('');
                              setError(null);
                              setNotice(null);
                            }}
                            className="text-zinc-400 hover:text-white"
                          >
                            Change sign-up details
                          </button>
                          <button
                            type="button"
                            onClick={handleResendVerification}
                            disabled={isSubmitting}
                            className="text-orange-400 hover:text-orange-300 disabled:opacity-50"
                          >
                            Resend code
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* ===================== SIGN UP FORM ===================== */
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Anthony Kevine"
                        className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-zinc-300">
                        Create Password
                      </label>
                      {signupPassword && (
                        <span className={`text-[10px] font-bold ${strengthInfo.text}`}>
                          {strengthInfo.label}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {signupPassword && (
                      <div className="grid grid-cols-4 gap-1.5 mt-2">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1 rounded-full transition-colors ${
                              strength >= step ? strengthInfo.color : 'bg-zinc-800'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-2 pt-1 text-[11px] text-zinc-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-white/20 bg-black/40 text-[#ff5722] cursor-pointer accent-[#ff5722]"
                    />
                    <span>
                      I agree to the <strong className="text-white">ANTHIRA Terms of Service</strong> and license terms.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:from-[#f4511e] hover:to-[#ff5722] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </span>
                    ) : (
                      <>
                        <span>Create ANTHIRA Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Bottom Switcher */}
              <div className="pt-2 text-center text-xs text-zinc-400 border-t border-white/5">
                {mode === 'login' ? (
                  <span>
                    New to ANTHIRA?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setError(null);
                      }}
                      className="font-bold text-[#ff5722] hover:underline"
                    >
                      Create an account
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError(null);
                      }}
                      className="font-bold text-[#ff5722] hover:underline"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#141822] border border-white/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-orange-400">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Reset Password</h3>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Enter your registered email address and we'll send you instructions to reset your account password.
            </p>

            {resetSent ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Reset link dispatched to <strong>{resetEmail}</strong>!</span>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5722]"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(false)}
                    className="px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="w-full border-t border-white/5 py-4 px-4 text-center text-xs text-zinc-500">
        © 2026 ANTHIRA. Protected by Cloudflare & SSL Encryption.
      </footer>
    </div>
  );
};
