import React, { useEffect, useState } from 'react';
import { Code2, Binary, Brackets, Terminal, Cpu, Database, Cloud, Server } from 'lucide-react';

const Background = () => {
    const [particles, setParticles] = useState([]);
    const [floatingIcons, setFloatingIcons] = useState([]);

    useEffect(() => {
        // Code symbols for floating particles
        const symbols = ['{', '}', '<>', '//', '()', '[]', '=>', '&&', '||', '+=', '!=', '=='];
        const newParticles = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 5,
            size: 12 + Math.floor(Math.random() * 8)
        }));
        setParticles(newParticles);

        // Tech icons configuration
        const icons = [
            { Icon: Cpu, color: 'text-blue-400' },
            { Icon: Database, color: 'text-green-400' },
            { Icon: Cloud, color: 'text-cyan-400' },
            { Icon: Server, color: 'text-purple-400' }
        ];

        const newFloatingIcons = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: Math.random() * 100,
            IconComponent: icons[i % icons.length],
            duration: 20 + Math.random() * 10,
            delay: Math.random() * 5,
            size: 16 + Math.floor(Math.random() * 16)
        }));
        setFloatingIcons(newFloatingIcons);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-30" />


            {/* Code Particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute font-mono opacity-20 animate-floating inset-0"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        fontSize: `${particle.size}px`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                        color: 'rgb(14, 165, 233)'
                    }}
                >
                    {particle.symbol}
                </div>
            ))}

            {/* Floating Tech Icons */}
            {floatingIcons.map((icon) => {
                const { Icon, color } = icon.IconComponent;
                return (
                    <div
                        key={icon.id}
                        className={`absolute ${color} opacity-20 animate-floating inset-0`}
                        style={{
                            left: `${icon.x}%`,
                            top: `${icon.y}%`,
                            animationDuration: `${icon.duration}s`,
                            animationDelay: `${icon.delay}s`
                        }}
                    >
                        <Icon size={icon.size} />
                    </div>
                );
            })}

            {/* Side Tech Icons */}
            <div className="fixed left-0 top-0 h-screen w-64 inset-0">
                <Binary className="absolute top-1/4 left-8 w-8 h-8 text-sky-500 opacity-20 animate-pulse" />
                <Code2 className="absolute top-1/2 left-12 w-8 h-8 text-sky-500 opacity-20 animate-bounce" />
            </div>

            <div className="fixed right-0 top-0 h-screen w-64">
                <Brackets className="absolute top-1/3 right-8 w-8 h-8 text-sky-500 opacity-20 animate-pulse" />
                <Terminal className="absolute top-2/3 right-12 w-8 h-8 text-sky-500 opacity-20 animate-bounce" />
            </div>

        </div>
    );
};

export default Background;