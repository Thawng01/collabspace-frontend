import React from "react";

const CTA: React.FC = () => {
    return (
        <section className="py-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to Transform Your Team Collaboration?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Join thousands of teams that have streamlined their workflow
                    and boosted productivity with CollabSpace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-12 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl">
                        Start Free 14-Day Trial
                    </button>
                    <button className="border border-white text-white hover:bg-white/10 font-semibold py-4 px-12 rounded-xl transition-all duration-300 ease-out hover:scale-105">
                        Schedule a Demo
                    </button>
                </div>
                <p className="text-sm opacity-75 mt-6">
                    No credit card required • Free forever plan available
                </p>
            </div>
        </section>
    );
};

export default CTA;
