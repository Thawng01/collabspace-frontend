import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="py-20 md:py-32 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">
                    Trusted by 10,000+ teams worldwide
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    Team Collaboration
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Perfected
                </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create workspaces, manage projects, assign tasks, and
                collaborate with your team in one powerful platform. Everything
                you need to{" "}
                <span className="font-semibold text-blue-600">ship faster</span>{" "}
                and{" "}
                <span className="font-semibold text-purple-600">
                    work smarter
                </span>
                .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                    <span className="relative z-10 flex items-center">
                        Start Free Trial
                        <svg
                            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                </button>

                <button className="group bg-white/80 backdrop-blur-sm border border-gray-300/50 hover:border-gray-400/50 text-gray-700 font-semibold py-4 px-12 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
                    <span className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        View Demo
                    </span>
                </button>
            </div>

            {/* Collaboration Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-200/50">
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">50K+</div>
                    <div className="text-gray-600 text-sm">Workspaces</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">1M+</div>
                    <div className="text-gray-600 text-sm">Projects</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">10M+</div>
                    <div className="text-gray-600 text-sm">Tasks Completed</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">
                        99.2%
                    </div>
                    <div className="text-gray-600 text-sm">
                        Team Satisfaction
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
