import React, { useEffect, useState, useCallback } from 'react';

const NeuralBackground = () => {
    const [nodes, setNodes] = useState([]);
    const [connections, setConnections] = useState([]);

    const generateRandomNodes = useCallback((count) => {
        return Array.from({ length: count }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1
        }));
    }, []);

    const updateNodePositions = useCallback((nodes) => {
        return nodes.map(node => {
            let x = node.x + node.vx;
            let y = node.y + node.vy;

            if (x <= 0 || x >= 100) node.vx *= -1;
            if (y <= 0 || y >= 100) node.vy *= -1;

            x = Math.max(0, Math.min(100, x));
            y = Math.max(0, Math.min(100, y));

            return { ...node, x, y };
        });
    }, []);

    const generateConnections = useCallback((nodes) => {
        const connections = [];
        const maxDistance = 30;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    connections.push({
                        from: i,
                        to: j,
                        opacity: 1 - (distance / maxDistance)
                    });
                }
            }
        }

        return connections;
    }, []);

    useEffect(() => {
        const initialNodes = generateRandomNodes(30);
        setNodes(initialNodes);

        const interval = setInterval(() => {
            setNodes(prevNodes => {
                const updatedNodes = updateNodePositions(prevNodes);
                setConnections(generateConnections(updatedNodes));
                return updatedNodes;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [generateRandomNodes, updateNodePositions, generateConnections]);

    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-red-50">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                    <radialGradient id="nodeGradient">
                        <stop offset="0%" stopColor="#50afc0" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#50afc0" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {connections.map((connection, index) => (
                    <line
                        key={`connection-${index}`}
                        x1={nodes[connection.from].x}
                        y1={nodes[connection.from].y}
                        x2={nodes[connection.to].x}
                        y2={nodes[connection.to].y}
                        stroke="#50afc0"
                        strokeWidth="0.1"
                        strokeOpacity={connection.opacity * 0.5}
                    />
                ))}

                {nodes.map((node, index) => (
                    <g key={`node-${index}`}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="0.5"
                            fill="#50afc0"
                        />
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="2"
                            fill="url(#nodeGradient)"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default NeuralBackground;