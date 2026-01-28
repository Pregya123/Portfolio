
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Phone, ExternalLink, Scroll, Book, Code, Award, MessageSquare, Menu, X, ChevronRight, FileText, MapPin, Calendar } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATIONS, CERTIFICATIONS, SKILL_GROUPS } from './data';
import { GoogleGenAI } from '@google/genai';

// --- Decorative Components ---

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-16 text-center">
    <div className="flex items-center justify-center gap-4 mb-2">
      <div className="h-px w-12 bg-[#c5a059]"></div>
      <span className="text-[#c5a059] uppercase tracking-[0.3em] text-xs font-bold">Archives</span>
      <div className="h-px w-12 bg-[#c5a059]"></div>
    </div>
    <h2 className="text-4xl md:text-5xl font-serif-heading font-bold text-[#3d2b1f] mb-4">
      {title}
    </h2>
    {subtitle && <p className="font-body text-[#6d5b4a] italic text-lg">{subtitle}</p>}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white border border-[#e0d5c1] p-8 rounded-sm shadow-[4px_4px_0px_0px_#f0e6d2] hover:shadow-[8px_8px_0px_0px_#e0d5c1] transition-all duration-300 relative overflow-hidden group ${className}`}>
    {children}
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Greetings. I am Pregya's virtual archive assistant. How may I assist your inquiry into her professional background?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'skills', 'education'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -150 && rect.top <= 250;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an AI Librarian for Pregya Ganjoo's professional portfolio. Answer in a professional, slightly formal, Light Academia tone. 
        Context:
        Summary: ${PERSONAL_INFO.summary}
        Skills: ${SKILL_GROUPS.map(g => `${g.category}: ${g.items.join(', ')}`).join('; ')}
        Experience: ${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period})`).join('; ')}
        Education: ${EDUCATIONS.map(ed => `${ed.degree} from ${ed.institution} (${ed.grade})`).join('; ')}
        Question: ${userMessage}`,
      });

      setChatMessages(prev => [...prev, { role: 'bot', text: response.text || "The records for this specific query seem to be missing from my current desk." }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: "A slight disturbance in the archives. Please restate your query." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Entrance' },
    { id: 'experience', label: 'Expeditions' },
    { id: 'projects', label: 'Works' },
    { id: 'skills', label: 'Mastery' },
    { id: 'education', label: 'Studies' }
  ];

  return (
    <div className="min-h-screen selection:bg-[#d4b483] selection:text-[#3d2b1f]">
      {/* Decorative Border Frame */}
      <div className="fixed inset-0 border-[12px] border-[#e0d5c1] pointer-events-none z-50 opacity-20"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-[#fdfaf3]/95 backdrop-blur-sm border-b border-[#e0d5c1] z-40 px-8 py-5 flex justify-between items-center">
        <div className="text-xl font-serif-heading font-bold text-[#3d2b1f] flex items-center gap-3 group cursor-default">
          <div className="w-10 h-10 bg-[#3d2b1f] text-white flex items-center justify-center rounded-sm group-hover:bg-[#8b5e3c] transition-colors">
            <span className="text-lg">P</span>
          </div>
          <span className="hidden sm:block tracking-widest uppercase text-sm">Pregya Ganjoo</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-xs font-bold transition-all duration-300 uppercase tracking-[0.2em] ${
                activeSection === link.id ? 'text-[#8b5e3c]' : 'text-[#6d5b4a] hover:text-[#3d2b1f]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href={`mailto:${PERSONAL_INFO.email}`} className="ml-4 px-5 py-2 border border-[#3d2b1f] text-[#3d2b1f] text-xs font-bold uppercase tracking-widest hover:bg-[#3d2b1f] hover:text-white transition-all">
            Contact
          </a>
        </div>

        <button className="md:hidden text-[#3d2b1f]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#fdfaf3] z-50 flex flex-col items-center justify-center gap-10 md:hidden">
          <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-serif-heading text-[#3d2b1f] tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-32 pb-20 px-8 flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-block px-4 py-1 border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
            Computer Engineer & Data Strategist
          </div>
          <h1 className="text-6xl md:text-8xl font-serif-heading font-bold text-[#3d2b1f] leading-tight tracking-tight">
            Distilling Complexity <br />
            <span className="italic font-normal text-[#8b5e3c] serif-font font-serif">into Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#6d5b4a] max-w-2xl mx-auto font-body leading-relaxed opacity-90">
            {PERSONAL_INFO.summary}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <a href="#experience" className="group flex items-center gap-3 text-[#3d2b1f] font-bold uppercase tracking-widest text-sm border-b-2 border-[#3d2b1f] pb-1 hover:border-[#8b5e3c] hover:text-[#8b5e3c] transition-all">
              Explore The Archives <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="h-px w-12 bg-[#e0d5c1] hidden sm:block"></div>
            <div className="flex gap-6">
              <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" className="text-[#3d2b1f] hover:text-[#8b5e3c] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href={`https://${PERSONAL_INFO.github}`} target="_blank" className="text-[#3d2b1f] hover:text-[#8b5e3c] transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        {/* Subtle Background Text */}
        <div className="absolute bottom-10 left-10 text-[#e0d5c1] font-serif-heading text-9xl opacity-20 pointer-events-none select-none hidden lg:block">
          01
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-8 py-32 space-y-48">
        
        {/* Experience Section */}
        <section id="experience" className="scroll-mt-32">
          <SectionTitle title="The Professional Ledger" subtitle="Documenting key milestones in data and analysis" />
          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
                <div className="md:sticky md:top-32 space-y-4">
                  <div className="text-[#8b5e3c] font-bold text-sm tracking-widest uppercase">{exp.period}</div>
                  <h3 className="text-2xl font-serif-heading font-bold text-[#3d2b1f] leading-tight">{exp.role}</h3>
                  <div className="flex flex-col gap-2 text-[#6d5b4a] font-body">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {exp.company}</span>
                    <span className="text-sm opacity-70 italic">{exp.location}</span>
                  </div>
                </div>
                <Card className="bg-white">
                   <ul className="space-y-4">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-4 text-[#4a3b2f] font-body text-lg leading-relaxed">
                        <span className="text-[#c5a059] font-bold">I.</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32">
          <SectionTitle title="Exhibited Works" subtitle="Curated research and technical development projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project, idx) => (
              <Card key={idx} className="flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold uppercase tracking-widest text-[#8b5e3c] px-2 py-1 bg-[#fdfaf3] border border-[#e0d5c1]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif-heading font-bold text-[#3d2b1f] mb-4">
                    {project.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#c5a059]"></div>
                </div>
                <div className="flex-grow space-y-4 mb-8">
                  {project.description.map((desc, dIdx) => (
                    <p key={dIdx} className="text-[#4a3b2f] text-sm font-body leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3d2b1f] hover:text-[#8b5e3c] transition-colors group">
                  Study Manuscript <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-32">
          <SectionTitle title="Scholarly Mastery" subtitle="The specialized tools and technical proficiencies" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {SKILL_GROUPS.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] text-xs font-bold">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#3d2b1f]">
                    {group.category}
                  </h4>
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between group cursor-default">
                      <span className="text-[#6d5b4a] font-body text-lg group-hover:text-[#3d2b1f] transition-colors">{skill}</span>
                      <div className="h-px flex-grow mx-4 border-t border-dotted border-[#e0d5c1]"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Certifications - Professional Grid */}
          <div className="mt-24 p-12 bg-white border border-[#e0d5c1] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fdfaf3] px-6 text-[#c5a059] font-serif-heading text-xl italic font-bold">
              Honorary Certificates
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 hover:bg-[#fdfaf3] rounded-sm transition-colors">
                  <Award className="w-5 h-5 text-[#c5a059] shrink-0" />
                  <div>
                    <h5 className="font-bold text-[#3d2b1f] text-sm leading-snug">{cert.name}</h5>
                    <p className="text-xs text-[#8b5e3c] uppercase tracking-wider mt-1">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section - The Full Timeline */}
        <section id="education" className="scroll-mt-32 pb-20">
          <SectionTitle title="Academic Foundation" subtitle="Complete record of scholarly pursuit" />
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16 relative">
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[#e0d5c1]"></div>
              {EDUCATIONS.map((edu, idx) => (
                <div key={idx} className="relative pl-12 group">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-[#8b5e3c] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    <Book className="w-4 h-4 text-[#8b5e3c]" />
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-[#8b5e3c] flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {edu.period}
                      </div>
                      <h3 className="text-2xl font-serif-heading font-bold text-[#3d2b1f] group-hover:text-[#8b5e3c] transition-colors">{edu.degree}</h3>
                      <p className="text-lg text-[#6d5b4a] font-body flex items-center gap-2">
                        <MapPin className="w-4 h-4 opacity-50" /> {edu.institution}, {edu.location}
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-[#3d2b1f] text-white text-sm font-bold tracking-widest">
                      {edu.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer - Professional Design */}
      <footer className="bg-[#1a1512] text-[#fdfaf3] pt-24 pb-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-16 mb-20">
            <div>
              <div className="text-3xl font-serif-heading font-bold mb-8">Pregya Ganjoo</div>
              <p className="font-body text-xl opacity-60 leading-relaxed max-w-sm mb-8">
                Synthesizing engineering rigor with data-centric narratives to solve the challenges of tomorrow.
              </p>
              <div className="flex gap-6">
                <a href={`https://${PERSONAL_INFO.linkedin}`} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href={`https://${PERSONAL_INFO.github}`} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-all"><Github className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-[0.2em] text-[#c5a059] text-xs">Directory</h4>
              <ul className="space-y-4 text-[#e0d5c1] font-body">
                {navLinks.map(link => (
                  <li key={link.id}><a href={`#${link.id}`} className="hover:text-white transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-[0.2em] text-[#c5a059] text-xs">Communication</h4>
              <div className="space-y-4 text-[#e0d5c1] font-body">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="block hover:text-white transition-colors break-all">{PERSONAL_INFO.email}</a>
                <div className="text-sm opacity-60">{PERSONAL_INFO.phone}</div>
              </div>
              <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] border-b border-white/20 pb-2 hover:border-[#c5a059] hover:text-[#c5a059] transition-all group">
                Download CV <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40 text-center">
            <span>&copy; {new Date().getFullYear()} Pregya Ganjoo Portfolio Archive</span>
            <div className="flex gap-8">
              <span>GDPR Compliant</span>
              <span>Built with Precision</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Improved Chat Widget */}
      <div className="fixed bottom-10 right-10 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-[#3d2b1f] text-white rounded-full shadow-2xl hover:bg-[#8b5e3c] transition-all flex items-center justify-center group"
            aria-label="Ask the Librarian"
          >
            <MessageSquare className="w-7 h-7" />
            <div className="absolute right-full mr-4 bg-[#3d2b1f] text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
              Consult The Archives
            </div>
          </button>
        ) : (
          <div className="bg-[#fdfaf3] border border-[#3d2b1f] w-[350px] sm:w-[450px] flex flex-col shadow-[12px_12px_0px_0px_#3d2b1f] animate-in fade-in zoom-in duration-300">
            <div className="bg-[#3d2b1f] p-5 flex justify-between items-center text-[#fdfaf3]">
              <div className="flex items-center gap-4">
                <Scroll className="w-5 h-5 text-[#c5a059]" />
                <div className="flex flex-col">
                  <span className="font-serif-heading font-bold text-lg">The AI Librarian</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Status: Active Archives</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:text-[#c5a059] transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="h-[400px] overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-sm text-sm font-body leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-[#3d2b1f] text-white border-l-4 border-[#c5a059]' 
                    : 'bg-white text-[#3d2b1f] border border-[#e0d5c1] shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e0d5c1] p-4 italic text-[#8b5e3c] text-xs tracking-widest animate-pulse">
                    Consulting the scholarly records...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-5 bg-white border-t border-[#3d2b1f] flex gap-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Inquire about studies or experience..."
                className="flex-grow bg-[#fdfaf3] border border-[#e0d5c1] px-4 py-3 text-sm focus:outline-none focus:border-[#3d2b1f] font-body placeholder:italic transition-all"
              />
              <button 
                onClick={handleSendMessage}
                className="w-12 h-12 bg-[#3d2b1f] text-white flex items-center justify-center hover:bg-[#8b5e3c] transition-colors"
                disabled={isTyping}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
