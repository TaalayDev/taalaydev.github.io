import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px]  -z-10" />


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