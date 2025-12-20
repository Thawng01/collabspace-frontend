import { Link } from "react-router";

const PublicHeader = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-lg border-b border-gray-200/30 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                C
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            CollabSpace
                        </h1>
                    </div>
                    {/* 
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                        >
                            How It Works
                        </a>
                        <a
                            href="#pricing"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                        >
                            Pricing
                        </a>
                    </nav> */}

                    <div className="flex items-center space-x-4">
                        <Link to="/login">
                            <button className="hidden sm:block text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                Sign In
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="relative bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-400 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 ease-out hover:scale-101 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group">
                                <span className="relative z-10 flex items-center">
                                    Get Started
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PublicHeader;
