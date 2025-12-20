const HowWork = () => {
    return (
        <section id="how-it-works" className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                    Streamline Your Workflow
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    From workspace creation to task completion - everything in
                    one seamless flow.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Step 1 */}
                <div className="group text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-2xl">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Create Workspace
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Set up your team workspace with custom settings,
                        permissions, and branding.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="group text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:border-green-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Invite Team
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Add team members with specific roles and permissions.
                        Control access levels.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="group text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:border-purple-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-2xl">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Manage Projects
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Organize work into projects with timelines, milestones,
                        and progress tracking.
                    </p>
                </div>

                {/* Step 4 */}
                <div className="group text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:border-orange-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-2xl">4</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Assign Tasks
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Delegate tasks, set deadlines, and track progress with
                        real-time updates.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowWork;
