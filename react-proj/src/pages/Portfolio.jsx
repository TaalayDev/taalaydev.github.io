import React from 'react';
import { Github, Mail, MessageCircle, Linkedin, ChevronDown } from 'lucide-react';
import { projects, skils, experiences } from '../data/data';

import computerGuy from '../assets/computerGuy.jpeg';
import gmail from '../assets/gmail.svg';
import telegram from '../assets/telegram.svg';
import octocat from '../assets/octocat.svg';
import linkedin from '../assets/linkedin.svg';

import Navbar from '../components/Navbar';
import ProjectSlider from '../components/ProjectSlider';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillsRadarChart from '../components/SkillsRadarChart';
import ContactForm from '../components/ContactForm';
import ScrollAnimation from '../components/ScrollAnimation';
import ProjectGrid3D from '../components/ProjectCard3D';

const Portfolio = () => {
    const socialLinks = [
        { icon: <Mail className="w-5 h-5" />, href: "mailto:a.u.taalay@gmail.com", label: "Email" },
        { icon: <MessageCircle className="w-5 h-5" />, href: "https://t.me/taalay_dev", label: "Telegram" },
        { icon: <Github className="w-5 h-5" />, href: "https://github.com/TaalayDev", label: "GitHub" },
        { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/taalaydev/", label: "LinkedIn" }
    ];

    return (
        <div className="mx-auto page-container">
            <Navbar />
            <main className="px-8">
                {/* About Me */}
                <div className="grid grid-cols-3 mt-8" id="about">
                    <div className="col-span-3 md:col-span-2 text-left flex items-center">
                        <div>
                            <h2 className="text-bold text-2xl">
                                <span className="text-[#50afc0] font-bold">About</span> Me
                            </h2>

                            <p className="mt-2 text-lg font-medium">
                                Hi, I'm Taalay, a passionate software engineer with a knack
                                for crafting clean, efficient, and user-friendly solutions.
                            </p>

                            <p className="mt-1 text-sm">
                                I'm a self-taught developer with a strong foundation in
                                mobile and web technologies. I specialize in building
                                high-quality, scalable applications that deliver exceptional
                                user experiences.
                            </p>

                            <div className="flex flex-wrap gap-4 items-center mt-3">
                                <a
                                    href="mailto: a.u.taalay@gmail.com"
                                    className="contact-icon w-10 h-10 flex items-center justify-center rounded-lg hover:scale-110 transition-transform duration-300 border border-gray-500 p-2.5"
                                >
                                    <img src={gmail} alt="gmail" />
                                </a>
                                <a
                                    href="https://web.telegram.org/k/#@taalay_dev"
                                    className="contact-icon w-10 h-10 flex items-center justify-center rounded-lg hover:scale-110 transition-transform duration-300 border border-gray-500 p-2.5"
                                >
                                    <img src={telegram} alt="telegram" />
                                </a>
                                <a
                                    href="https://github.com/TaalayDev"
                                    className="contact-icon w-10 h-10 flex items-center justify-center rounded-lg hover:scale-110 transition-transform duration-300 border border-gray-500 p-2.5"
                                >
                                    <img src={octocat} alt="github" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/taalaydev/"
                                    className="contact-icon w-10 h-10 flex items-center justify-center rounded-lg hover:scale-110 transition-transform duration-300 border border-gray-500 p-2.5"
                                >
                                    <img src={linkedin} alt="linkedin" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 md:col-span-1 md:mt-0 mt-3 flex items-center justify-center">
                        <img src={computerGuy} alt="" style={{ maxHeight: '250px' }} />
                    </div>
                </div>

                {/* Experience And Skills */}
                <div className="grid grid-cols-2 mt-8">
                    <ExperienceTimeline experiences={experiences} />

                    <div className="col-span-2 md:col-span-1 text-left md:mt-0 mt-3 md:pl-8">
                        <ScrollAnimation animation='fadeUp'>
                            <SkillsRadarChart skills={skils} />
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Projects */}
                <div className="mt-14 text-left" id="projects">
                    <h2 style={{ fontSize: '25px' }} className="font-normal mb-8">
                        Last Projects I worked on
                    </h2>
                    <div className='mb-16'>
                        <ProjectGrid3D projects={projects} />
                    </div>
                </div>

                
            </main>
            
        </div>
    );
};

export default Portfolio;