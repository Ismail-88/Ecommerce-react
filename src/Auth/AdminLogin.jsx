
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Store,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Package,
  ShoppingCart,
  BarChart3,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../context/DataContext';

// ============= ZOD VALIDATION SCHEMA =============
const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password is too long'),
  rememberMe: z.boolean().optional()
});

const features = [
  {
    icon: Package,
    title: 'Product Catalog',
    text: 'Manage your entire inventory in one place',
  },
  {
    icon: ShoppingCart,
    title: 'Order Management',
    text: 'Track, update and fulfill every order',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics',
    text: 'Real-time sales and performance insights',
  },
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email: data.email,
        password: data.password
      });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(response.data.user));

        if (data.rememberMe) {
          localStorage.setItem('rememberAdmin', data.email);
        } else {
          localStorage.removeItem('rememberAdmin');
        }

        await Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${response.data.user.name || 'Admin'} 👋`,
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true
        });

        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('❌ Login error:', err);

      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        'Login failed. Please try again.';

      setServerError(errorMessage);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonColor: '#ff3f6c'
      });

      reset({ email: data.email, password: '', rememberMe: data.rememberMe });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full pl-12 pr-12 py-3.5 border-2 rounded-xl bg-input-bg text-foreground placeholder:text-text-faint focus:ring-4 focus:ring-brand-600/15 focus:border-brand-600 transition-all duration-200 disabled:bg-surface-alt disabled:cursor-not-allowed ${
      hasError
        ? 'border-danger focus:border-danger focus:ring-danger/10'
        : 'border-border hover:border-border-strong'
    }`;

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Ambient brand blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-brand-500/20 blur-3xl animate-drift" />
        <div className="absolute bottom-0 -left-40 h-[460px] w-[460px] rounded-full bg-brand-600/15 blur-3xl animate-drift-reverse" />
        <div className="absolute top-1/2 right-1/4 h-[260px] w-[260px] rounded-full bg-rose-400/10 blur-3xl animate-drift" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="w-full max-w-4xl lg:max-w-5xl relative z-10 animate-page-enter">
        <div className="grid lg:grid-cols-2 rounded-3xl border border-border bg-surface shadow-overlay overflow-hidden">
          {/* ========== LEFT BRAND PANEL ========== */}
          <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-600 via-brand-700 to-brand-950 p-10 text-white overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-drift" />
              <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-rose-300/20 blur-3xl animate-drift-reverse" />
              <div className="absolute top-1/3 right-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur border border-white/20 shadow-lg">
                  <Store className="w-6 h-6" aria-hidden />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight leading-none">
                    ShopSphere
                  </h1>
                  <p className="text-sm text-brand-100 font-medium mt-1">
                    Commerce Operating System
                  </p>
                </div>
              </div>

              <div className="mt-12 space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" aria-hidden />
                  Admin Control Center
                </span>
                <h2 className="text-3xl font-black leading-tight mt-4">
                  Run your store like a pro.
                </h2>
                <p className="text-brand-100/90 text-sm leading-relaxed max-w-sm">
                  Everything you need to manage products, orders, customers and
                  growth — in one modern command center.
                </p>
              </div>
            </div>

            <div className="relative space-y-4">
              {features.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4 transition-transform hover:translate-x-1 duration-200"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 flex-shrink-0">
                    <Icon className="w-5 h-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-bold text-sm">{title}</p>
                    <p className="text-xs text-brand-100/90 mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========== RIGHT FORM PANEL ========== */}
          <div className="relative p-6 sm:p-10 lg:p-12">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-md shadow-brand-600/30">
                <Store className="w-6 h-6 text-white" aria-hidden />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-foreground leading-none">
                  ShopSphere
                </h1>
                <p className="text-xs text-text-muted font-medium mt-1">
                  Admin Portal
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto lg:mx-0">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" aria-hidden />
                  <span className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Secure Sign In
                  </span>
                </div>
                <h2 className="text-3xl font-black text-foreground mb-2">
                  Welcome back
                </h2>
                <p className="text-text-muted">
                  Sign in to manage your store
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Server Error Message */}
                {serverError && (
                  <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4 animate-fade-in-up">
                    <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" aria-hidden />
                    <div className="flex-1">
                      <p className="text-sm text-danger font-semibold">{serverError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setServerError('')}
                      className="text-danger/70 hover:text-danger transition-colors"
                      aria-label="Dismiss error"
                    >
                      <span className="text-lg leading-none">×</span>
                    </button>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 ${errors.email ? 'text-danger' : 'text-text-faint'}`} aria-hidden />
                    </span>
                    <input
                      type="email"
                      {...register('email')}
                      disabled={loading}
                      className={inputClass(Boolean(errors.email))}
                      placeholder="admin@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-danger text-sm font-medium animate-fade-in-up">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 ${errors.password ? 'text-danger' : 'text-text-faint'}`} aria-hidden />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      disabled={loading}
                      className={inputClass(Boolean(errors.password))}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-foreground transition-colors disabled:cursor-not-allowed"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" aria-hidden />
                      ) : (
                        <Eye className="w-5 h-5" aria-hidden />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-danger text-sm font-medium animate-fade-in-up">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      disabled={loading}
                      className="w-4 h-4 rounded border-border text-brand-600 focus:ring-brand-500 disabled:cursor-not-allowed"
                    />
                    <span className="text-sm text-text-secondary group-hover:text-foreground transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold transition-colors hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Please contact your system administrator to reset your password.');
                    }}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-800 text-white py-4 rounded-xl font-bold text-lg hover:from-brand-700 hover:to-brand-900 transform hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-brand-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    loading ? 'animate-pulse' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface text-text-muted font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Go to User Site */}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-2 text-text-secondary hover:text-foreground font-semibold py-3 rounded-xl transition-all duration-200 border-2 border-border hover:border-border-strong"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden />
                <span>Back to Store</span>
              </button>

              {/* Demo Credentials */}
              <div className="mt-6 rounded-2xl border border-brand-200 dark:border-brand-900 bg-brand-50 dark:bg-brand-950/40 p-5">
                <p className="text-brand-700 dark:text-brand-300 font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" aria-hidden />
                  Demo Credentials
                </p>
                <div className="space-y-2 text-sm text-brand-900/80 dark:text-brand-200/80">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold min-w-[70px]">Email:</span>
                    <code className="bg-surface px-3 py-1 rounded-md border border-brand-200 dark:border-brand-900 font-mono text-brand-700 dark:text-brand-300">
                      admin@example.com
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold min-w-[70px]">Password:</span>
                    <code className="bg-surface px-3 py-1 rounded-md border border-brand-200 dark:border-brand-900 font-mono text-brand-700 dark:text-brand-300">
                      admin123
                    </code>
                  </div>
                </div>
                <p className="text-brand-600/80 dark:text-brand-400/80 text-xs mt-3 italic">
                  Create your admin account first using: POST /api/admin/register
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-text-faint mt-8">
              © 2025 ShopSphere. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
