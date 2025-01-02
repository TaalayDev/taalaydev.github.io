import React, { useEffect, useState } from 'react';
import { Code2, Binary, Brackets, Terminal } from 'lucide-react';

const SideAnimations = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const symbols = ['{', '}', '<', '>', '/', '()', '[]', '=>', '&&', '||'];
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

    return (
        <>
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-5 bg-grid-slate-100 bg-[length:50px_50px]" />

                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute font-mono text-cyan-600 opacity-20 animate-floating"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`
                        }}
                    >
                        {particle.symbol}
                    </div>
                ))}

                <div className="fixed left-0 top-0 h-screen w-64">
                    <Binary className="absolute top-1/4 left-8 w-8 h-8 text-cyan-600 opacity-20 animate-pulse" />
                    <Code2 className="absolute top-1/2 left-12 w-8 h-8 text-cyan-600 opacity-20 animate-bounce" />
                </div>

                <div className="fixed right-0 top-0 h-screen w-64">
                    <Brackets className="absolute top-1/3 right-8 w-8 h-8 text-cyan-600 opacity-20 animate-pulse" />
                    <Terminal className="absolute top-2/3 right-12 w-8 h-8 text-cyan-600 opacity-20 animate-bounce" />
                </div>

                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#50afc0,transparent)]" />
                </div>
            </div>
        </>
    );
};

export default SideAnimations;