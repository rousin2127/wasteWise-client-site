import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';


export const RootLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;