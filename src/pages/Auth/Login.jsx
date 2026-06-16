import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const {signInUser}= useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

     const handleLogin = (data) => {
        setServerError('');
        signInUser(data.identifier, data.password)
            .then(() => {
                navigate('/dashboard');
            })
            .catch(error => {
                setServerError(error.message || 'Login failed');
            });
    };
        // data.identifier will hold either the email or phone number entered by the user


    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 ">
            <form 
                onSubmit={handleSubmit(handleLogin)} 
                className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-xs text-gray-500 mt-1">Log in to manage your Clean City account</p>
                </div>
                
                <fieldset className="flex flex-col gap-4">
                    
                    {/* Dynamic Email or Phone Input Field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email or Phone Number
                        </label>
                        <input 
                            type="text" 
                            {...register('identifier', { 
                                required: 'Please enter your email address, phone number, or staff ID' 
                            })} 
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.identifier ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`} 
                            placeholder="example@mail.com / 01XXXXXXXXX / COL-0001" 
                        />
                        {errors.identifier && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {errors.identifier.message}
                            </span>
                        )}
                    </div>

                    {/* Password Field with Show/Hide toggle */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <a className="text-xs text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                {...register('password', { 
                                    required: 'Password is required'
                                })} 
                                className={`w-full px-4 py-2.5 pr-16 rounded-lg border text-sm outline-none transition-all ${errors.password ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`} 
                                placeholder="******" 
                            />
                            {/* Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer select-none"
                            >
                                {showPassword ? 'HIDE' : 'SHOW'}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md transition-all text-sm mt-2">
                        Log In
                    </button>
                    {serverError && (
                        <p className="text-xs text-red-600 text-center">{serverError}</p>
                    )}

                    {/* Quick Link to Registration */}
                    <p className="text-xs text-center text-slate-500 mt-2">
                        Don't have an account?{' '}
                        <Link to={'/register'} className="text-emerald-500 hover:underline cursor-pointer font-medium">
                            Register here
                        </Link >
                    </p>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;