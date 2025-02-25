import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SkillsRadarChart = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // Transform skills data for the radar chart
  const chartData = skills.map(skill => ({
    subject: skill.name,
    value: skill.percent,
    languages: skill.langs.join(', '),
    fullMark: 100,
  }));
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
          <p className="font-medium text-gray-900">{data.subject}</p>
          <p className="text-sm text-blue-600">{data.value}% proficiency</p>
          <p className="text-xs text-gray-600 mt-1">
            Languages: {data.languages}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-80 w-full max-w-md mx-auto mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#4b5563', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
            activeDot={{ r: 8, fill: "#2563eb" }}
            onMouseEnter={(data) => setHoveredSkill(data.subject)}
            onMouseLeave={() => setHoveredSkill(null)}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Skill details section */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              hoveredSkill === skill.name
                ? 'border-blue-400 bg-blue-50 scale-105'
                : 'border-gray-200'
            }`}
          >
            <p className="font-medium text-sm text-gray-900">{skill.name}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {skill.langs.map((lang, i) => (
                <span
                  key={i}
                  className="text-xs py-0.5 px-2 bg-blue-100 text-blue-700 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadarChart;