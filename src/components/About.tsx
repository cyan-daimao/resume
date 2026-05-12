import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Server,
  Cloud,
  BarChart3,
  Terminal,
  Cpu,
  Shield,
} from 'lucide-react';
import TerminalComponent from './Terminal';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: '数据中台产品',
    icon: <Database className="w-4 h-4" />,
    items: ['元数据', '指标平台', '画像中台', '查询平台', '分析平台', '看板平台'],
    color: '#10b981',
  },
  {
    category: '数据治理',
    icon: <Shield className="w-4 h-4" />,
    items: ['数据权限', '调度系统', '数据血缘', '数据质量', '存算分离'],
    color: '#f59e0b',
  },
  {
    category: '后端架构',
    icon: <Code2 className="w-4 h-4" />,
    items: ['Java', 'Go', '微服务', 'DDD', 'Spring Boot', 'gRPC'],
    color: '#38bdf8',
  },
  {
    category: '前端开发',
    icon: <BarChart3 className="w-4 h-4" />,
    items: ['React', 'TypeScript', 'Vue3', 'ECharts', 'Ant Design'],
    color: '#f472b6',
  },
  {
    category: '云原生 & DevOps',
    icon: <Cloud className="w-4 h-4" />,
    items: ['Kubernetes', 'Docker', 'CI/CD', 'Jenkins', '测试服务'],
    color: '#60a5fa',
  },
  {
    category: '数据工程',
    icon: <Cpu className="w-4 h-4" />,
    items: ['Flink', 'Kafka', 'Spark', 'Iceberg', 'StarRocks', 'RustFS'],
    color: '#8b5cf6',
  },
  {
    category: '基础设施',
    icon: <Server className="w-4 h-4" />,
    items: ['VPN', 'K8s', 'Linux', 'Shell', '服务器运维'],
    color: '#a78bfa',
  },
  {
    category: '工程能力',
    icon: <Terminal className="w-4 h-4" />,
    items: ['Git', '架构设计', '从0到1', '全栈独立开发', 'VibeCoding'],
    color: '#94a3b8',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.terminal-wrapper', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.terminal-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.skill-card', {
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="pt-12 pb-24 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* About Text */}
        <div className="about-text mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow border border-accent/20 text-accent text-xs font-mono mb-4">
            <Terminal className="w-3 h-3" />
            ABOUT ME
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            关于我
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-text-secondary leading-relaxed">
              VibeCoding 超级个体，5 年数据中台产品独立开发经验。具备从数据采集、存储、计算到应用的全链路独立开发能力，涵盖存算分离、元数据平台、指标平台、画像中台、查询平台、分析平台、看板平台、数据权限、调度系统、数据血缘、数据质量等核心模块。
            </p>
            <p className="text-text-secondary leading-relaxed">
              精通 Java 与微服务架构设计，独立设计 DDBD 代码架构设计(DDD优化版)，具备企业级 Maven 项目构建能力。熟悉 React + TypeScript 前端技术栈，拥有独立的全栈开发能力。
            </p>
            <p className="text-text-secondary leading-relaxed">
              具备企业级落地架构设计能力，拥有 CI/CD + K8s 独立部署经验，企业级测试服务从 0 到 1 建设能力，从 VPN 到 K8s 的完整服务器开发经验。多次从 0 到 1 完成企业级数据中台完整项目。
            </p>
          </div>
        </div>

        {/* Terminal */}
        <div className="terminal-wrapper mb-16">
          <TerminalComponent />
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
            技术栈
          </h3>
          <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="skill-card glass rounded-xl p-4 border border-border hover:border-white/25 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(56,189,248,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="p-1.5 rounded-md"
                    style={{
                      backgroundColor: `${skill.color}15`,
                      color: skill.color,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {skill.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded text-xs font-mono border border-border text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
