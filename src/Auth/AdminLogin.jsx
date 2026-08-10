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
  AlertCircle,
  Loader2,
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
    `w-full pl-11 pr-11 py-2.5 rounded-lg border bg-input-bg text-sm text-foreground placeholder:text-text-faint focus:outline-none focus:ring-2 transition-colors disabled:bg-surface-alt disabled:cursor-not-allowed ${
      hasError
        ? 'border-danger focus:border-danger focus:ring-danger/10'
        : 'border-border hover:border-border-strong focus:border-brand-600 focus:ring-brand-600/10'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Thin brand accent bar */}
      <div aria-hidden className="h-1 w-full bg-brand-600" />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md animate-page-enter">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-600 text-white mb-4 shadow-sm">
              <Store size={22} aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              ShopSphere
            </h1>
            <p className="text-sm text-text-muted mt-1">Admin Control Center</p>
          </div>

          {/* Card */}
          <div className="bg-surface rounded-xl border border-border shadow-card p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground">Sign in</h2>
              <p className="text-sm text-text-muted mt-0.5">
                Access your admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Server Error Message */}
              {serverError && (
                <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger-soft p-3 animate-fade-in-up">
                  <AlertCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" aria-hidden />
                  <p className="flex-1 text-sm text-danger font-medium">{serverError}</p>
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
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`w-4 h-4 ${errors.email ? 'text-danger' : 'text-text-faint'}`} aria-hidden />
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
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`w-4 h-4 ${errors.password ? 'text-danger' : 'text-text-faint'}`} aria-hidden />
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
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-foreground transition-colors disabled:cursor-not-allowed"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden />
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
              <div className="flex items-center justify-between pt-1">
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
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white py-2.5 rounded-lg font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>

          {/* Back to Store */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 text-sm text-text-secondary hover:text-foreground font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            <span>Back to Store</span>
          </button>

          {/* Demo Credentials */}
          <div className="mt-4 rounded-lg border border-border bg-surface-alt p-4">
            <p className="text-sm font-semibold text-text-secondary mb-2">
              Demo credentials
            </p>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-text-muted min-w-[70px]">Email:</span>
                <code className="bg-background px-2.5 py-1 rounded-md border border-border font-mono text-foreground">
                  admin@example.com
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-text-muted min-w-[70px]">Password:</span>
                <code className="bg-background px-2.5 py-1 rounded-md border border-border font-mono text-foreground">
                  admin123
                </code>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-text-faint mt-8">
            © 2026 ShopSphere. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
