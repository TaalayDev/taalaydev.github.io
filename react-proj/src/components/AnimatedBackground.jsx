import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Animated circles */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            {/* Gradient beams */}
            <div className="absolute inset-0">
                <div className="absolute top-0 -left-40 h-96 w-96 bg-gradient-to-r from-blue-200 to-cyan-200 opacity-30 blur-2xl animate-pulse" />
                <div className="absolute bottom-0 -right-40 h-96 w-96 bg-gradient-to-r from-purple-200 to-pink-200 opacity-30 blur-2xl animate-pulse animation-delay-2000" />
            </div>

            {/* Moving dots */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-500 rounded-full animate-floating"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: 0.1
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AnimatedBackground;