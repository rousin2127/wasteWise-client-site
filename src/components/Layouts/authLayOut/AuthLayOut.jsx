import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayOut = () => {
    return (
        <div className=' min-h-screen bg-[#1c2d37]'>
            <div className=' max-w-7xl mx-auto p-4 bg-[#1c2d37]'>
                <Link to={'/'} className="text-2xl font-bold text-white tracking-wide ">
                Waste<span className="text-emerald-400">Wise</span>
            </Link>
            <div className=''>
                <Outlet></Outlet>
            </div>
            </div>
        </div>
    );
};

export default AuthLayOut;