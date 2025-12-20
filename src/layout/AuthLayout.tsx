// HeaderLanding.tsx
import React from "react";
import PublicHeader from "../components/PublicHeader";
import { Outlet } from "react-router";

const HeaderLanding: React.FC = () => {
    const handleLogin = () => {
        console.log("Login button clicked");
        alert("Login functionality would go here!");
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Absolute Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100 z-0">
                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-1/3 -right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Fixed Header */}
            <PublicHeader />

            {/* Advanced Landing Page Content */}

            <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <Outlet />
            </main>
        </div>
    );
};

export default HeaderLanding;
