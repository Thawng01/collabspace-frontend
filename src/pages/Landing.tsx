import CTA from "../components/CTA";
import Hero from "../components/Hero";
import HowWork from "../components/HowWork";

const Landing = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Hero />

            <HowWork />

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                        Powerful Collaboration Features
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything your team needs to collaborate effectively
                        and deliver outstanding results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Workspace Management */}
                    <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Workspace Management
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Create multiple workspaces for different teams or
                            clients with custom branding and settings.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Custom workspace settings
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Role-based permissions
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Brand customization
                            </li>
                        </ul>
                    </div>

                    {/* Project Organization */}
                    <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-green-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Project Organization
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Structure work into projects with milestones,
                            deadlines, and progress tracking.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Timeline & milestones
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Progress tracking
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                File sharing
                            </li>
                        </ul>
                    </div>

                    {/* Task Management */}
                    <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-purple-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Task Management
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Create, assign, and track tasks with deadlines,
                            priorities, and status updates.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                Task assignment
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                Priority levels
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                Due date tracking
                            </li>
                        </ul>
                    </div>

                    {/* Team Collaboration */}
                    <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-orange-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg
                                className="w-7 h-7 text-white"
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
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Team Collaboration
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Invite members, manage roles, and collaborate in
                            real-time with your team.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                Member invitations
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                Role management
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                Real-time updates
                            </li>
                        </ul>
                    </div>

                    {/* Analytics & Reporting */}
                    <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-red-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Analytics & Reporting
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Track team performance, project progress, and
                            productivity with detailed analytics.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                                Progress analytics
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                                Team performance
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                                Export reports
                            </li>
                        </ul>
                    </div>

                    {/* Integration Hub */}
                    <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-indigo-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Integration Hub
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Connect with your favorite tools and services for a
                            seamless workflow experience.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                50+ app integrations
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                API access
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                Custom webhooks
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTA />
        </div>
    );
};

export default Landing;
