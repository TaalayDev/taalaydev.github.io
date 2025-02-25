import React, { useState } from 'react';
import { BriefcaseBusiness, ChevronRight, Calendar } from 'lucide-react';

const TimelineItem = ({ experience, isActive, onClick }) => {
  return (
    <div 
      className={`relative mb-8 cursor-pointer group transition-all duration-300 ${
        isActive ? 'scale-105' : 'opacity-70 hover:opacity-90'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        {/* Timeline connector */}
        <div className="mr-4 relative">
          <div className="h-full w-0.5 absolute left-4 top-8 bg-gray-200 -z-10"></div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100'
            } transition-colors duration-300`}
          >
            <BriefcaseBusiness className="w-4 h-4" />
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex-1 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{experience.title}</h3>
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {experience.date}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{experience.profession}</p>
          
          {isActive && (
            <div className="mt-3 text-sm text-gray-500 animate-fadeIn">
              <p className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-blue-500" />
                Key responsibilities and achievements
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline = ({ experiences }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Journey</h2>
      
      <div className="relative pl-4">
        {experiences.map((experience, index) => (
          <TimelineItem 
            key={index}
            experience={experience}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;