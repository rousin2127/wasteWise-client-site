import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');

    // Added 'trigger' here to manually force validation on changes
    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
    const {registerUser}= useAuth()

    const emailValue = watch('email');
    const phoneValue = watch('phone');
    const holdingNoValue = watch('holdingNo');
    const flatNoValue = watch('flatNo');

    const handleRegistration = (data) => {
        setServerError('');
        const payload = {
            role: 'resident',
            name: data.name,
            email: data.email || '',
            phone: data.phone || '',
            password: data.password,
            holdingNo: data.holdingNo || '',
            flatNo: data.flatNo || '',
            location: {
                lat: data.lat ? Number(data.lat) : null,
                lng: data.lng ? Number(data.lng) : null,
                address: data.address || ''
            }
        };

        registerUser(payload)
            .then(() => {
                alert('Registration Successful!');
            })
            .catch(error => {
                setServerError(error.message || 'Registration failed');
            });
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 ">
            <form 
                onSubmit={handleSubmit(handleRegistration)} 
                className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >   
                <div className='text-center mb-6'>
                <h2 className="text-2xl font-bold text-center text-slate-800 ">Create an Account</h2>
                <p className="text-xs text-gray-500 mt-1">Please registration to make your Clean City</p>
                </div>
                <fieldset className="flex flex-col gap-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            {...register('name', { required: 'Name is required' })} 
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`} 
                            placeholder="Your full name" 
                        />
                        {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            {...register('email', {
                                validate: (value) => {
                                    if (!value && !phoneValue) {
                                        return 'You must provide either Email or Phone number';
                                    }
                                    return true;
                                },
                                // যখনই ইমেইলে টাইপ করা হবে, এটি ফোনের এররও চেক করে রিমুভ করে দিবে
                                onChange: () => { if(phoneValue || emailValue) trigger('phone') }
                            })} 
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`} 
                            placeholder="example@mail.com" 
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input 
                            type="tel" 
                            {...register('phone', {
                                validate: (value) => {
                                    if (!value && !emailValue) {
                                        return 'You must provide either Email or Phone number';
                                    }
                                    return true;
                                },
                                // যখনই ফোনে টাইপ করা হবে, এটি ইমেইলের এররও চেক করে রিমুভ করে দিবে
                                onChange: () => { if(phoneValue || emailValue) trigger('email') }
                            })} 
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`} 
                            placeholder="01XXXXXXXXX" 
                        />
                        
                        {/* Separate or Shared Error Message UI */}
                        {(errors.email || errors.phone) && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {errors.email?.message || errors.phone?.message}
                            </span>
                        )}
                    </div>

                    {/* Holding / Flat (required) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Holding No</label>
                        <input
                            type="text"
                            {...register('holdingNo', {
                                validate: (value) => {
                                    if (!value && !flatNoValue) {
                                        return 'Holding No or Flat No is required';
                                    }
                                    return true;
                                },
                                onChange: () => { if (holdingNoValue || flatNoValue) trigger('flatNo'); }
                            })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.holdingNo ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`}
                            placeholder="Holding number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Flat No</label>
                        <input
                            type="text"
                            {...register('flatNo', {
                                validate: (value) => {
                                    if (!value && !holdingNoValue) {
                                        return 'Holding No or Flat No is required';
                                    }
                                    return true;
                                },
                                onChange: () => { if (holdingNoValue || flatNoValue) trigger('holdingNo'); }
                            })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.flatNo ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`}
                            placeholder="Flat number"
                        />
                        {(errors.holdingNo || errors.flatNo) && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {errors.holdingNo?.message || errors.flatNo?.message}
                            </span>
                        )}
                    </div>

                    {/* Location (lat/lng) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location (Lat)</label>
                        <input
                            type="number"
                            step="any"
                            {...register('lat', { required: 'Latitude is required' })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.lat ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`}
                            placeholder="23.8103"
                        />
                        {errors.lat && <span className="text-red-500 text-xs mt-1 block">{errors.lat.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location (Lng)</label>
                        <input
                            type="number"
                            step="any"
                            {...register('lng', { required: 'Longitude is required' })}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${errors.lng ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`}
                            placeholder="90.4125"
                        />
                        {errors.lng && <span className="text-red-500 text-xs mt-1 block">{errors.lng.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Address (optional)</label>
                        <input
                            type="text"
                            {...register('address')}
                            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all border-gray-300 focus:border-emerald-500"
                            placeholder="House address"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} 
                                className={`w-full px-4 py-2.5 pr-16 rounded-lg border text-sm outline-none transition-all ${errors.password ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-emerald-500'}`} 
                                placeholder="******" 
                            />
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

                    <div className="flex justify-end">
                        <a className="text-xs text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer">Forgot password?</a>
                    </div>
                    
                    <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md transition-all text-sm mt-2">
                        Register
                    </button>
                    {serverError && (
                        <p className="text-xs text-red-600 text-center">{serverError}</p>
                    )}
                </fieldset>

                <p className=' text-xs text-center text-slate-500 mt-2'>Have an Account? Please <Link to={'/login'} className='text-green-500'>LogIn</Link></p>
            </form>
        </div>
    );
};

export default Register;