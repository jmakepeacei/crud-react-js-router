import React from 'react';
import logo from '../assets/react.svg';
import { Outlet } from 'react-router-dom';
import Menu from "./Menu";
import '../App.css';

const MainComponent = () => {
    return (
        <div className="main-layout">
            <aside className="sidebar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <Menu />
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
};

export default MainComponent;