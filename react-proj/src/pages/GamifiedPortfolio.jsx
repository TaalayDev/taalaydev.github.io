import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Code, 
  Sparkles, 
  Smartphone, 
  Globe, 
  Database, 
  Award, 
  Activity,
  Github,
  Terminal,
  Coffee,
  Zap,
  CheckCircle2
} from 'lucide-react';

const GamifiedPortfolio = ({ onComplete }) => {
  const { theme } = { theme: 'light' };
  const isDark = theme === 'dark';
  
  // Data from your portfolio
  const skills = [
    { name: "Android", langs: ["Java", "Kotlin"], percent: 85 },
    { name: "Flutter", langs: ["Dart"], percent: 95 },
    { name: "Backend", langs: ["PHP", "Laravel"], percent: 70 },
    { name: "Web", langs: ["JavaScript", "React", "Vue"], percent: 60 },
    { name: "iOS, MacOS", langs: ["Swift"], percent: 40 },
  ];
  
  const projects = [
    {
      name: "Pixel Verse",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a5/b8/2b/a5b82b51-ea09-28b7-3370-3b331ee98b9f/AppIcon-0-0-1x_U007emarketing-0-10-0-0-85-220.png/340x340bb.png",
      platforms: {
        sourcecode: "https://github.com/TaalayDev/PixelVerse",
      },
      stack: ["Flutter"],
      description: "A Feature-Rich Pixel Art Creation Tool"
    },
    {
      name: "JSMaster",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/85/e8/14/85e8149c-27f8-f5c8-e9f3-1563813ffca6/AppIcon-0-0-1x_U007emarketing-0-10-0-0-85-220.png/340x340bb.png",
      platforms: {
        sourcecode: "https://github.com/TaalayDev/JSMaster",
      },
      stack: ["Flutter"],
      description: "Interactive JavaScript learning app built with Flutter."
    },
    {
      name: "Doodle Verse",
      image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_L4ml17sYGI_JW7P3NJH_Q.png",
      platforms: {
        sourcecode: "https://github.com/TaalayDev/DoodleVerse-ComposeMultiplatform",
      },
      stack: ["Kotlin Multiplatform", "Jetpack Compose"],
      description: "Cross-platform digital drawing application"
    },
    {
      name: "Doodle Verse Flutter",
      image: "https://images.ctfassets.net/23aumh6u8s0i/4TsG2mTRrLFhlQ9G1m19sC/4c9f98d56165a0bdd71cbe7b9c2e2484/flutter",
      platforms: {
        sourcecode: "https://github.com/TaalayDev/doodle_verse",
      },
      stack: ["Flutter"],
      description: "Feature-rich digital drawing application"
    }
  ];
  
  const experiences = [
    { title: "Freelancing", profession: "Android Developer, Web Development", date: "2018 - 2019" },
    { title: "One-Team company", profession: "Android Developer, Cofounder", date: "2019 - 2021" },
    { title: "Oracle Digital", profession: "Flutter Developer (Remotely Contract)", date: "2021 - 2022" },
    { title: "ItAdis", profession: "Lead Flutter and Android Developer", date: "2022 January - 2022 September" },
    { title: "Oracle Digital", profession: "Lead Flutter and Android Developer", date: "2022 September - 2024 February" },
    { title: "Peacky Group", profession: "Android Developer", date: "2024 March - 2024 May" },
    { title: "Peacky Group", profession: "iOS, MacOS Developer", date: "2024 May - 2024 September" },
  ];
  
  const aboutTitle = "Hi, I'm Taalay, a passionate software engineer with a knack for crafting clean, efficient, and user-friendly solutions.";
  const aboutDescription = "I'm a self-taught developer with a strong foundation in mobile and web technologies. I specialize in building high-quality, scalable applications that deliver exceptional user experiences.";
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);
  const [skillsUnlocked, setSkillsUnlocked] = useState([]);
  const [projectsUnlocked, setProjectsUnlocked] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const terminalInputRef = useRef(null);
  const gameContainerRef = useRef(null);
  
  // Terminal commands
  const [terminalInput, setTerminalInput] = useState('');
  
  // Experience levels
  const levels = [
    { name: "Novice Coder", xpRequired: 0 },
    { name: "Script Apprentice", xpRequired: 50 },
    { name: "Function Crafter", xpRequired: 150 },
    { name: "Algorithm Adept", xpRequired: 300 },
    { name: "Code Architect", xpRequired: 500 },
    { name: "Tech Wizard", xpRequired: 800 }
  ];
  
  // Challenges/achievements to unlock
  const challenges = [
    { id: 'intro', name: 'First Contact', description: 'Start your coding journey', xp: 20, isCompleted: false },
    { id: 'terminal', name: 'Command Line Hero', description: 'Use the terminal to discover hidden commands', xp: 50, isCompleted: false },
    { id: 'skills', name: 'Skill Explorer', description: 'Unlock all skills', xp: 75, isCompleted: false },
    { id: 'projects', name: 'Project Archaeologist', description: 'Discover all projects', xp: 100, isCompleted: false },
    { id: 'secret', name: 'Easter Egg Hunter', description: 'Find the hidden easter egg', xp: 150, isCompleted: false }
  ];
  
  // Game progression logic
  useEffect(() => {
    // Check level based on XP
    const newLevel = levels.findIndex(level => {
      const nextLevel = levels[levels.indexOf(level) + 1];
      return !nextLevel || xp < nextLevel.xpRequired;
    });
    
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
      
      // Level up animation and effects
      const message = `Congratulations! You've reached level ${newLevel + 1}: ${levels[newLevel].name}`;
      addTerminalOutput(message, 'success');
      
      // Unlock content based on level
      if (newLevel >= 1 && skillsUnlocked.length === 0) {
        // Unlock first skill at level 1
        unlockSkill(0);
      }
      
      if (newLevel >= 2 && projectsUnlocked.length === 0) {
        // Unlock first project at level 2
        unlockProject(0);
      }
      
      if (newLevel >= 3) {
        // Unlock more skills at level 3
        skills.forEach((_, index) => {
          if (!skillsUnlocked.includes(index)) {
            setTimeout(() => unlockSkill(index), index * 1000);
          }
        });
      }
      
      if (newLevel >= 4) {
        // Unlock all projects at level 4
        projects.forEach((_, index) => {
          if (!projectsUnlocked.includes(index)) {
            setTimeout(() => unlockProject(index), index * 1000);
          }
        });
      }
    }
  }, [xp, currentLevel, skillsUnlocked, projectsUnlocked]);
  
  // Typing effect for terminal outputs
  const typeWriter = (text, callback) => {
    setIsTyping(true);
    let i = 0;
    const speed = 20; // typing speed
    
    const type = () => {
      if (i < text.length) {
        setTerminalOutput(prev => {
          const newOutput = [...prev];
          // Update the last message with more characters
          if (newOutput.length > 0) {
            newOutput[newOutput.length - 1].text = text.substring(0, i + 1);
          }
          return newOutput;
        });
        i++;
        setTimeout(type, speed);
      } else {
        setIsTyping(false);
        if (callback) callback();
      }
    };
    
    type();
  };
  
  // Add messages to terminal with optional styling
  const addTerminalOutput = (text, type = 'info') => {
    const newEntry = { text: '', type };
    setTerminalOutput(prev => [...prev, newEntry]);
    
    // Start typing effect for the new entry
    typeWriter(text, () => {
      // Scroll terminal to bottom when typing completes
      if (terminalInputRef.current) {
        terminalInputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };
  
  // Process terminal commands
  const processCommand = (command) => {
    // Add command to output
    setTerminalOutput(prev => [...prev, { text: `> ${command}`, type: 'command' }]);
    
    // Process various commands
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'help':
        addTerminalOutput(
          'Available commands: help, clear, skills, projects, about, experience, level, unlock [item], secret, exit', 
          'system'
        );
        awardXp(5);
        break;
        
      case 'clear':
        setTerminalOutput([]);
        break;
        
      case 'skills':
        const unlockedSkillsCount = skillsUnlocked.length;
        if (unlockedSkillsCount === 0) {
          addTerminalOutput('No skills unlocked yet. Keep gaining XP!', 'warning');
        } else {
          addTerminalOutput(
            `Showing ${unlockedSkillsCount}/${skills.length} unlocked skills:`, 
            'success'
          );
          skillsUnlocked.forEach(index => {
            const skill = skills[index];
            addTerminalOutput(`• ${skill.name} (${skill.langs.join(', ')}) - Proficiency: ${skill.percent}%`, 'info');
          });
        }
        awardXp(5);
        break;
        
      case 'projects':
        const unlockedProjectsCount = projectsUnlocked.length;
        if (unlockedProjectsCount === 0) {
          addTerminalOutput('No projects unlocked yet. Reach level 2 to unlock your first project!', 'warning');
        } else {
          addTerminalOutput(
            `Showing ${unlockedProjectsCount}/${projects.length} unlocked projects:`, 
            'success'
          );
          projectsUnlocked.forEach(index => {
            const project = projects[index];
            addTerminalOutput(`• ${project.name} - ${project.description}`, 'info');
          });
        }
        awardXp(5);
        break;
        
      case 'about':
        addTerminalOutput(aboutTitle, 'system');
        addTerminalOutput(aboutDescription, 'info');
        awardXp(5);
        break;
        
      case 'experience':
        addTerminalOutput('Professional Experience:', 'system');
        experiences.forEach(exp => {
          addTerminalOutput(`• ${exp.title} - ${exp.profession} (${exp.date})`, 'info');
        });
        awardXp(10);
        break;
        
      case 'level':
        addTerminalOutput(
          `Current Level: ${currentLevel + 1} - ${levels[currentLevel].name}`, 
          'success'
        );
        
        if (currentLevel < levels.length - 1) {
          const nextLevel = levels[currentLevel + 1];
          const xpNeeded = nextLevel.xpRequired - xp;
          addTerminalOutput(
            `XP: ${xp}/${nextLevel.xpRequired} (${xpNeeded} XP needed for next level)`, 
            'info'
          );
        } else {
          addTerminalOutput(`XP: ${xp} (Max level reached!)`, 'success');
        }
        break;
        
      case 'unlock all':
        // Secret command to unlock everything
        addTerminalOutput('🎮 CHEAT CODE ACTIVATED: Unlocking all content!', 'success');
        
        // Unlock all skills
        skills.forEach((_, index) => {
          if (!skillsUnlocked.includes(index)) {
            unlockSkill(index);
          }
        });
        
        // Unlock all projects
        projects.forEach((_, index) => {
          if (!projectsUnlocked.includes(index)) {
            unlockProject(index);
          }
        });
        
        // Award XP
        awardXp(200);
        completeChallenge('skills');
        completeChallenge('projects');
        break;
        
      case 'secret':
        // Easter egg found!
        addTerminalOutput('🎉 You found the easter egg!', 'success');
        addTerminalOutput('As a reward, here\'s a fun fact: The name "Taalay" means "morning sun" in Kyrgyz.', 'system');
        completeChallenge('secret');
        awardXp(150);
        break;
        
      case 'exit':
        addTerminalOutput('Exiting terminal mode...', 'system');
        setTimeout(() => setShowTerminal(false), 1000);
        break;
        
      default:
        // Check for "unlock" command
        if (cmd.startsWith('unlock ')) {
          const item = cmd.substring(7).trim();
          
          // Find matching skill
          const skillIndex = skills.findIndex(s => 
            s.name.toLowerCase() === item.toLowerCase()
          );
          
          if (skillIndex !== -1 && !skillsUnlocked.includes(skillIndex)) {
            unlockSkill(skillIndex);
            addTerminalOutput(`Unlocked skill: ${skills[skillIndex].name}!`, 'success');
            awardXp(25);
            return;
          }
          
          // Find matching project
          const projectIndex = projects.findIndex(p => 
            p.name.toLowerCase() === item.toLowerCase()
          );
          
          if (projectIndex !== -1 && !projectsUnlocked.includes(projectIndex)) {
            unlockProject(projectIndex);
            addTerminalOutput(`Unlocked project: ${projects[projectIndex].name}!`, 'success');
            awardXp(40);
            return;
          }
          
          addTerminalOutput(`Item not found or already unlocked: ${item}`, 'error');
        } else {
          addTerminalOutput(`Command not recognized: ${command}. Type 'help' for available commands.`, 'error');
        }
        break;
    }
  };
  
  // Handle terminal input
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.trim() && !isTyping) {
      processCommand(terminalInput);
      setTerminalInput('');
    }
  };
  
  // Award XP to player
  const awardXp = (amount) => {
    setXp(prevXp => prevXp + amount);
    // Show floating XP notification
    const gameContainer = gameContainerRef.current;
    if (gameContainer && amount > 0) {
      const xpNotification = document.createElement('div');
      xpNotification.className = 'floating-xp';
      xpNotification.textContent = `+${amount} XP`;
      
      // Random position within container
      const x = Math.random() * (gameContainer.offsetWidth - 100);
      const y = Math.random() * (gameContainer.offsetHeight - 100) + 50;
      
      xpNotification.style.left = `${x}px`;
      xpNotification.style.top = `${y}px`;
      
      gameContainer.appendChild(xpNotification);
      
      // Animate and remove
      setTimeout(() => {
        xpNotification.classList.add('fade-out');
        setTimeout(() => {
          gameContainer.removeChild(xpNotification);
        }, 1000);
      }, 1500);
    }
  };
  
  // Unlock a skill by index
  const unlockSkill = (index) => {
    if (!skillsUnlocked.includes(index)) {
      setSkillsUnlocked(prev => [...prev, index]);
      
      // Check if all skills are unlocked
      if (skillsUnlocked.length + 1 === skills.length) {
        completeChallenge('skills');
      }
    }
  };
  
  // Unlock a project by index
  const unlockProject = (index) => {
    if (!projectsUnlocked.includes(index)) {
      setProjectsUnlocked(prev => [...prev, index]);
      
      // Check if all projects are unlocked
      if (projectsUnlocked.length + 1 === projects.length) {
        completeChallenge('projects');
      }
    }
  };
  
  // Complete a challenge
  const completeChallenge = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId]);
      
      // Find the challenge and award XP
      const challenge = challenges.find(c => c.id === challengeId);
      if (challenge) {
        addTerminalOutput(`🏆 ACHIEVEMENT UNLOCKED: ${challenge.name}`, 'achievement');
        addTerminalOutput(challenge.description, 'info');
        awardXp(challenge.xp);
      }
    }
  };
  
  // Start the game
  const handleStartGame = () => {
    setGameStarted(true);
    completeChallenge('intro');
  };
  
  // Submit player name
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setNameEntered(true);
      
      // Display welcome message in terminal
      setTimeout(() => {
        setShowTerminal(true);
        addTerminalOutput(`Welcome to the coding adventure, ${playerName}!`, 'system');
        addTerminalOutput('Type "help" to see available commands.', 'info');
        completeChallenge('terminal');
      }, 1000);
    }
  };
  
  // Navigate to main portfolio
  const handleContinueToPortfolio = () => {
    if (typeof onComplete === 'function') {
      onComplete();
    }
  };
  
  // Get skill icon based on name
  const getSkillIcon = (name) => {
    switch(name.toLowerCase()) {
      case 'android':
        return <Smartphone className="w-6 h-6" />;
      case 'flutter':
        return <Code className="w-6 h-6" />;
      case 'backend':
        return <Database className="w-6 h-6" />;
      case 'web':
        return <Globe className="w-6 h-6" />;
      case 'ios, macos':
        return <Terminal className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };
  
  // Calculate progress percentage for XP bar
  const calculateProgress = () => {
    if (currentLevel >= levels.length - 1) return 100;
    
    const currentLevelXp = levels[currentLevel].xpRequired;
    const nextLevelXp = levels[currentLevel + 1].xpRequired;
    const levelProgress = xp - currentLevelXp;
    const levelRange = nextLevelXp - currentLevelXp;
    
    return Math.min(100, Math.floor((levelProgress / levelRange) * 100));
  };

  return (
    <div 
      ref={gameContainerRef}
      className={`min-h-screen w-full relative flex flex-col items-center justify-center p-4 transition-colors duration-300 overflow-hidden
        ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float pointer-events-none"
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            background: isDark 
              ? `rgba(${96 + Math.random() * 30}, ${205 + Math.random() * 50}, ${219 + Math.random() * 36}, ${0.1 + Math.random() * 0.2})`
              : `rgba(${80 + Math.random() * 20}, ${175 + Math.random() * 20}, ${192 + Math.random() * 20}, ${0.1 + Math.random() * 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      
      {/* Game start screen */}
      {!gameStarted && (
        <div className="text-center z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Portfolio Adventure
          </h1>
          <p className="text-lg mb-8 opacity-80">
            Discover Taalay's skills, projects, and experiences through an interactive journey.
          </p>
          <button
            onClick={handleStartGame}
            className={`px-8 py-4 rounded-lg text-white font-bold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105
              ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'}`}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <span>Start Adventure</span>
          </button>
        </div>
      )}
      
      {/* Name entry screen */}
      {gameStarted && !nameEntered && (
        <div className={`p-6 rounded-lg shadow-lg max-w-md w-full z-10 transition-colors
          ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className="text-2xl font-bold mb-4">What should we call you?</h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 focus:ring-blue-500 text-white' 
                    : 'bg-gray-50 border-gray-300 focus:ring-blue-400 text-black'}`}
                maxLength={20}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors
                ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'}`}
            >
              Begin Adventure
            </button>
          </form>
        </div>
      )}
      
      {/* Main game interface */}
      {gameStarted && nameEntered && (
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 z-10 py-4">
          {/* Left sidebar - Player stats */}
          <div className={`lg:w-1/4 rounded-lg p-4 space-y-4 transition-colors
            ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="text-center">
              <h2 className="text-xl font-bold">{playerName}</h2>
              <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {levels[currentLevel].name}
              </p>
            </div>
            
            {/* XP Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Level {currentLevel + 1}</span>
                <span>{currentLevel < levels.length - 1 ? `${xp}/${levels[currentLevel + 1].xpRequired} XP` : `${xp} XP`}</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden bg-opacity-20 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
            
            {/* Achievements */}
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Award className="w-4 h-4 mr-1" />
                Achievements ({completedChallenges.length}/{challenges.length})
              </h3>
              <div className="space-y-2">
                {challenges.map(challenge => (
                  <div 
                    key={challenge.id}
                    className={`text-sm p-2 rounded flex items-start gap-2 transition-colors
                      ${completedChallenges.includes(challenge.id)
                        ? isDark ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50' 
                        : isDark ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100'}`}
                  >
                    {completedChallenges.includes(challenge.id) ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 border-gray-400" />
                    )}
                    <div>
                      <div className="font-medium">{challenge.name}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {challenge.description}
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        +{challenge.xp} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Terminal toggle button */}
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className={`w-full mt-4 px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors
                ${isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-blue-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-blue-700'}`}
            >
              <Terminal className="w-4 h-4" />
              <span>{showTerminal ? 'Hide Terminal' : 'Show Terminal'}</span>
            </button>
            
            {/* Continue to portfolio button */}
            <button
              onClick={handleContinueToPortfolio}
              className={`w-full px-4 py-2 rounded text-white flex items-center justify-center gap-2 transition-colors
                ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'}`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>Continue to Portfolio</span>
            </button>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Terminal */}
            {showTerminal && (
              <div 
                className={`p-4 rounded-lg transition-all flex-1 min-h-[300px] flex flex-col
                  ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-black border border-gray-500'}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400 ml-2">terminal@{playerName.toLowerCase()}</span>
                </div>
                
                <div className="flex-1 overflow-y-auto font-mono text-sm">
                  {terminalOutput.map((output, index) => (
                    <div 
                      key={index} 
                      className={`whitespace-pre-wrap mb-1 ${
                        output.type === 'error' ? 'text-red-400' :
                        output.type === 'success' ? 'text-green-400' :
                        output.type === 'warning' ? 'text-yellow-400' :
                        output.type === 'system' ? 'text-purple-400' :
                        output.type === 'command' ? 'text-gray-400' :
                        output.type === 'achievement' ? 'text-yellow-300 font-bold' :
                        'text-gray-200'
                      }`}
                    >
                      {output.text}
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleTerminalSubmit} className="mt-2 flex">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                    disabled={isTyping}
                    placeholder={isTyping ? "Waiting..." : "Type a command..."}
                  />
                </form>
              </div>
            )}
            
            {/* Skills grid */}
            <div className={`p-6 rounded-lg transition-colors
              ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Skills Unlocked ({skillsUnlocked.length}/{skills.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg transition-all ${
                      skillsUnlocked.includes(index)
                        ? isDark ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'
                        : isDark ? 'bg-gray-700 bg-opacity-30' : 'bg-gray-100'
                    } ${
                      skillsUnlocked.includes(index) ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {getSkillIcon(skill.name)}
                      </div>
                      <div>
                        <h3 className="font-bold">{skill.name}</h3>
                        {skillsUnlocked.includes(index) ? (
                          <div className="text-sm">
                            {skill.langs.join(', ')}
                          </div>
                        ) : (
                          <div className="flex items-center text-sm">
                            <Coffee className="w-3 h-3 mr-1" />
                            <span>Locked - {currentLevel >= 3 ? 'Reach level 3 or find a way to unlock' : 'Keep exploring'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {skillsUnlocked.includes(index) && (
                      <div className="mt-3 w-full">
                        <div className="text-sm flex justify-between mb-1">
                          <span>Proficiency</span>
                          <span>{skill.percent}%</span>
                        </div>
                        <div className={`h-2 w-full rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                            style={{ width: `${skill.percent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Projects */}
            <div className={`p-6 rounded-lg transition-colors
              ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Projects Discovered ({projectsUnlocked.length}/{projects.length})
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg overflow-hidden transition-all transform ${
                      projectsUnlocked.includes(index) 
                        ? 'hover:scale-[1.02] cursor-pointer'
                        : 'filter grayscale opacity-50'
                    }`}
                  >
                    <div 
                      className="h-40 bg-cover bg-center" 
                      style={{ 
                        backgroundImage: `url(${project.image})` 
                      }}
                    >
                      <div className={`h-full w-full flex items-center justify-center
                        ${projectsUnlocked.includes(index) ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-60'}`}>
                        {!projectsUnlocked.includes(index) && (
                          <div className="bg-black bg-opacity-50 py-2 px-4 rounded">
                            <span className="text-white flex items-center">
                              {currentLevel >= 2 ? 'Reach level 2 or find a way to unlock' : 'Locked'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h3 className="font-bold text-lg">{project.name}</h3>
                      {projectsUnlocked.includes(index) && (
                        <>
                          <p className="text-sm mb-2 min-h-[40px]">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className={`text-xs py-1 px-2 rounded
                                  ${isDark 
                                    ? 'bg-blue-900 bg-opacity-50 text-blue-200' 
                                    : 'bg-blue-100 text-blue-800'}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {Object.keys(project.platforms).length > 0 && (
                            <div className="mt-3 flex gap-2">
                              {Object.entries(project.platforms).map(([platform, url], i) => (
                                platform === 'sourcecode' && (
                                  <a 
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1 rounded ${
                                      isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                                    }`}
                                  >
                                    <Github className="w-5 h-5" />
                                  </a>
                                )
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS for floating XP notifications */}
      <style jsx>{`
        .floating-xp {
          position: absolute;
          padding: 8px 12px;
          background: ${isDark ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 0.8)'};
          color: white;
          border-radius: 16px;
          font-weight: bold;
          pointer-events: none;
          z-index: 100;
          animation: float-up 2s ease-out;
        }
        
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
        
        .fade-out {
          animation: fade-out 1s ease-out forwards;
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default GamifiedPortfolio;