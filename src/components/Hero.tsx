import { useEffect, useRef } from 'react';
import { Code, BookOpen } from 'lucide-react';
import gsap from 'gsap';

const techStack = [
  'Java',
  'Go',
  'TypeScript',
  'React',
  'Vue3',
  'Spring Boot',
  'Microservices',
  'DDD',
  'Maven',
  'Kubernetes',
  'Docker',
  'CI/CD',
  'Flink',
  'Kafka',
  'Iceberg',
  'StarRocks',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      });
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.1,
      });
      gsap.from('.hero-tech', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center justify-center grid-pattern overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-warm/10 rounded-full blur-[128px] pointer-events-none" />

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-4xl">
        <div className="hero-title mb-6">
          <span className="block text-text-muted text-sm font-mono tracking-widest uppercase mb-4">
            Hello, I&apos;m
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="block text-text-primary">闫晨阳</span>
            <span className="block gradient-text mt-2">数据中台开发工程师</span>
          </h1>
        </div>

        <p className="hero-subtitle text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
          VibeCoding 超级个体，5 年数据中台产品全链路独立开发经验。
          精通 Java 微服务架构与 DDD 设计，具备从 0 到 1 企业级数据中台落地能力。
        </p>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="http://8.130.24.136:9102/"
            target="_blank"
            className="group px-6 py-3 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            代表作品
          </a>
          <a
            href="https://juejin.cn/user/1857506009691657"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 glass text-text-primary font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            个人博客
          </a>
          <a
            href="https://github.com/cyan-daimao"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 glass text-text-primary font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Tech Stack Tags */}
        <div className="hero-tech flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto mb-12">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-xs font-mono border border-border text-text-muted hover:border-accent/40 hover:text-accent transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '5+', label: '年经验' },
            { value: '10+', label: '模块' },
            { value: '全栈', label: '独立开发' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
