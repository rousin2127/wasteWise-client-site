import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';


export const RootLayOut = () => {
    return (
        <div className="inter min-h-screen flex flex-col">
            <Navbar></Navbar>
            <main className="flex-1">
              <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;