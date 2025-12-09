
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaStore } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

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

  // const onSubmit = async (data) => {
  //   setServerError('');
  //   setLoading(true);

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/admin/login', {
  //       email: data.email,
  //       password: data.password
  //     });

  //     if (response.data.success) {
  //       // Store token and user info
  //       localStorage.setItem('adminToken', response.data.token);
  //       localStorage.setItem('adminInfo', JSON.stringify(response.data.user));
        
  //       // Store remember me preference
  //       if (data.rememberMe) {
  //         localStorage.setItem('rememberAdmin', data.email);
  //       } else {
  //         localStorage.removeItem('rememberAdmin');
  //       }

  //       // Success feedback
  //       console.log('✅ Login successful!', response.data.user);
        
  //       // Redirect to admin dashboard
  //       navigate('/admin/dashboard');
  //     }
  //   } catch (err) {
  //     console.error('❌ Login error:', err);
      
  //     const errorMessage = err.response?.data?.error || 
  //                         err.message || 
  //                         'Login failed. Please try again.';
  //     setServerError(errorMessage);
      
  //     // Reset password field on error
  //     reset({ email: data.email, password: '', rememberMe: data.rememberMe });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const onSubmit = async (data) => {
  setServerError('');
  setLoading(true);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
      email: data.email,
      password: data.password
    });

    if (response.data.success) {
      // Store token and user info
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminInfo', JSON.stringify(response.data.user));

      if (data.rememberMe) {
        localStorage.setItem('rememberAdmin', data.email);
      } else {
        localStorage.removeItem('rememberAdmin');
      }

      // ✅ SweetAlert success popup
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

    // ❌ SweetAlert error popup
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: errorMessage,
      confirmButtonColor: '#e53e3e'
    });

    reset({ email: data.email, password: '', rememberMe: data.rememberMe });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 p-5 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <FaStore className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            ShopSphere
          </h1>
          <p className="text-xl font-semibold text-purple-300 mb-2">Admin Portal</p>
          <p className="text-gray-400">Sign in to manage your store</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Server Error Message */}
            {serverError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{serverError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setServerError('')}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className={`transition-colors ${
                    errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-red-500'
                  }`} />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  disabled={loading}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1.5 animate-fadeIn">
                  <span className="text-base">⚠️</span> 
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className={`transition-colors ${
                    errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-red-500'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  disabled={loading}
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors disabled:cursor-not-allowed"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center gap-1.5 animate-fadeIn">
                  <span className="text-base">⚠️</span> 
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  disabled={loading}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="ml-2.5 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Remember me
                </span>
              </label>
              <a 
                href="#" 
                className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors hover:underline"
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
              className={`w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading ? 'animate-pulse' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>

          {/* Go to User Site */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 font-semibold py-3 hover:bg-gray-50 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-gray-300"
          >
            <span>←</span> 
            <span>Back to Store</span>
          </button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5 shadow-lg">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div className="flex-1">
              <p className="text-yellow-900 font-bold mb-3">Demo Credentials</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-700 font-semibold min-w-[70px]">Email:</span>
                  <code className="bg-yellow-100 px-3 py-1 rounded text-yellow-900 font-mono">
                    admin@example.com
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-700 font-semibold min-w-[70px]">Password:</span>
                  <code className="bg-yellow-100 px-3 py-1 rounded text-yellow-900 font-mono">
                    admin123
                  </code>
                </div>
              </div>
              <p className="text-yellow-700 text-xs mt-3 italic">
                ⚠️ Create your admin account first using: <br/>
                <code className="bg-yellow-100 px-2 py-0.5 rounded">POST /api/admin/register</code>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © 2025 ShopSphere. All rights reserved.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
     <style>
{`
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  .animate-shake {
    animation: shake 0.5s;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`}
</style>
    </div>
  );
};

export default AdminLogin;