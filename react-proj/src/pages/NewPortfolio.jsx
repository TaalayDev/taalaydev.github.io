import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const aboutTitle = "Hi, I'm Taalay, a passionate software engineer with a knack for crafting clean, efficient, and user-friendly solutions.";
const aboutDescription = "I'm a self-taught developer with a strong foundation in mobile and web technologies. I specialize in building high-quality, scalable applications that deliver exceptional user experiences.";
const experienceText = "Over the years I've gained valuable experience through freelancing and collaborations with diverse teams, startups, and organizations. Here's a snapshot of my journey:";

const contacts = {
    email: "a.u.taalay@gmail.com",
    github: "https://github.com/TaalayDev",
    linkedin: "https://www.linkedin.com/in/taalaydev/",
    telegram: "https://t.me/taalay_dev",
};

const experiences = [
    {
        title: "Peacky Group",
        profession: "iOS, MacOS Developer",
        date: "2024 May - 2024 September"
    },
    {
        title: "Peacky Group",
        profession: "Android Developer",
        date: "2024 March - 2024 May"
    },
    {
        title: "Oracle Digital",
        profession: "Lead Flutter and Android Developer",
        date: "2022 September - 2024 February"
    },
    {
        title: "ItAdis",
        profession: "Lead Flutter and Android Developer",
        date: "2022 January - 2022 September"
    },
    {
        title: "Oracle Digital",
        profession: "Flutter Developer (Remotely Contract)",
        date: "2021 - 2022"
    }
];

const skills = [
    { name: "Android", langs: ["Java", "Kotlin"], percent: 85 },
    { name: "Flutter", langs: ["Dart"], percent: 95 },
    { name: "Backend", langs: ["PHP", "Laravel"], percent: 70 },
    { name: "Web", langs: ["Javascript", "React", "Vue"], percent: 60 },
    { name: "iOS, MacOS", langs: ["Swift"], percent: 40 },
];

const projects = [
    {
        name: "Pixel Verse",
        image: "/api/placeholder/340/340",
        platforms: {
            ios: "https://apps.apple.com/us/app/pixel-verse/id6736886514",
            macos: "https://apps.apple.com/us/app/pixel-verse/id6736886514",
            web: "https://taalaydev.github.io/pixelverse/",
            sourcecode: "https://github.com/TaalayDev/PixelVerse",
        },
        stack: ["Flutter"],
        description: "A Feature-Rich Pixel Art Creation Tool",
        note: [
            "Intuitive Drawing Tools: Pencil, brush, eraser, and more for precise pixel manipulation.",
            "Advanced Shape Tools: Easily create lines, rectangles, and circles.",
            "Layer Support: Create complex artwork with multiple layers.",
            "Animation Support: Create simple animations with frame management.",
        ]
    },
    {
        name: "JSMaster",
        image: "/api/placeholder/340/340",
        platforms: {
            ios: "https://apps.apple.com/us/app/js-master/id6736955510",
            macos: "https://apps.apple.com/us/app/js-master/id6736955510",
            sourcecode: "https://github.com/TaalayDev/JSMaster",
        },
        stack: ["Flutter"],
        description: "Interactive JavaScript learning app built with Flutter. Features real-time code execution, progress tracking, and offline lessons.",
        note: [
            "Interactive JavaScript lessons",
            "Real-time code execution",
            "Progress tracking",
            "Offline access to lessons",
        ]
    }
];
const NewPortfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('section').forEach((section) => {
            observer.observe(section);
        });

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const NavLink = ({ section, children }) => (
        <button
            onClick={() => {
                setActiveSection(section);
                setIsMenuOpen(false);
                document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative px-4 py-2 rounded-lg transition-all duration-500 overflow-hidden group ${activeSection === section
                    ? 'text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
        >
            <span className={`absolute inset-0 w-full h-full transition-all duration-500 ${activeSection === section
                    ? 'bg-blue-600'
                    : 'bg-transparent group-hover:bg-blue-50'
                } rounded-lg`}></span>
            <span className="relative">{children}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Progress bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-lg z-40">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Taalay
                        </span>
                        <div className="hidden md:flex space-x-2">
                            <NavLink section="home">Home</NavLink>
                            <NavLink section="experience">Experience</NavLink>
                            <NavLink section="skills">Skills</NavLink>
                            <NavLink section="projects">Projects</NavLink>
                        </div>
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="w-6 h-0.5 bg-gray-600 mb-1.5 transition-all duration-300 transform origin-center"
                                style={{ transform: isMenuOpen ? 'rotate(45deg) translate(0, 6px)' : '' }} />
                            <div className="w-6 h-0.5 bg-gray-600 mb-1.5 transition-all duration-300"
                                style={{ opacity: isMenuOpen ? 0 : 1 }} />
                            <div className="w-6 h-0.5 bg-gray-600 transition-all duration-300 transform origin-center"
                                style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(0, -6px)' : '' }} />
                        </button>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className={`md:hidden transition-all duration-500 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden bg-white/80 backdrop-blur-lg`}>
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        <NavLink section="home">Home</NavLink>
                        <NavLink section="experience">Experience</NavLink>
                        <NavLink section="skills">Skills</NavLink>
                        <NavLink section="projects">Projects</NavLink>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-20">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center py-20">
                    <div className={`transform transition-all duration-1000 ${isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-20 animate-pulse"></div>
                            <h1 className="relative text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                {aboutTitle.split(',')[0]}
                                <span className="block text-gray-800 mt-2">{aboutTitle.split(',')[1]}</span>
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                            {aboutDescription}
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: <Github size={24} />, link: contacts.github },
                                { icon: <Linkedin size={24} />, link: contacts.linkedin },
                                { icon: <Mail size={24} />, link: `mailto:${contacts.email}` },
                                { icon: <Send size={24} />, link: contacts.telegram }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-110 hover:rotate-6 group"
                                >
                                    <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                                        {social.icon}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-20">
                    <div className={`transform transition-all duration-1000 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Experience
                        </h2>
                        <p className="text-gray-600 mb-12 text-lg">{experienceText}</p>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{exp.title}</h3>
                                        <p className="text-blue-600 font-medium mb-1">{exp.profession}</p>
                                        <p className="text-gray-500 text-sm">{exp.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-20">
                    <div className={`transform transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Skills
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="flex justify-between mb-4">
                                        <h3 className="text-2xl font-semibold text-gray-800">{skill.name}</h3>
                                        <span className="text-blue-600 font-semibold text-xl">{skill.percent}%</span>
                                    </div>
                                    <div className="relative w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out"
                                            style={{
                                                width: isVisible.skills ? `${skill.percent}%` : '0%',
                                                transform: isVisible.skills ? 'scale(1)' : 'scale(0)'
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.langs.map((lang, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium
                            transition-all duration-300 transform hover:scale-105 hover:bg-blue-100"
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-20">
                    <div className={`transform transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">{project.name}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.stack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium
                              transition-all duration-300 transform hover:scale-105 hover:bg-blue-100"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="space-y-2 mb-6">
                                            {project.note.map((note, i) => (
                                                <p key={i} className="text-gray-500 text-sm flex items-start">
                                                    <span className="text-blue-400 mr-2">•</span>
                                                    {note}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {Object.entries(project.platforms).map(([platform, url]) => (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300
                              hover:bg-blue-700 transform hover:scale-105 hover:shadow-lg capitalize"
                                                >
                                                    {platform}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};


export default NewPortfolio;