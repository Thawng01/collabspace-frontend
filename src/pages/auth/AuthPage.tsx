import React, { useState, useEffect } from "react";
import { LoginPage } from "./LoginPage";
import { Register } from "./RegisterPage";

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-x flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative w-full max-w-6xl">
                <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
                    <div className="flex flex-col lg:flex-row min-h-[600px]">
                        {/* Left Side - Animated Illustration */}
                        <div className="lg:w-2/5 bg-gradient-to-br from-blue-600/90 to-purple-700/90 dark:from-blue-900/90 dark:to-purple-900/90 p-12 text-white relative overflow-hidden">
                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <div className="text-center lg:text-left mb-12">
                                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        {isLogin
                                            ? "Welcome Back!"
                                            : "Join Our Community!"}
                                    </h1>
                                    <p className="text-xl text-blue-100 font-medium leading-relaxed">
                                        {isLogin
                                            ? "Sign in to access your personalized dashboard and continue your amazing journey with us."
                                            : "Create your account today and unlock a world of possibilities with our cutting-edge platform."}
                                    </p>
                                </div>

                                {/* Animated Icons */}
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4 animate-fade-in-up">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-blue-100 font-medium">
                                            Secure & Reliable
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-4 animate-fade-in-up delay-200">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-blue-100 font-medium">
                                            Lightning Fast
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-4 animate-fade-in-up delay-400">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-blue-100 font-medium">
                                            24/7 Support
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent"></div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="lg:w-3/5 p-12 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                            {isLogin ? (
                                <LoginPage onToggleMode={toggleMode} />
                            ) : (
                                <Register onToggleMode={toggleMode} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
