import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ExternalLink,
  Code,
  Layers,
  BarChart3,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
  links: { label: string; href: string }[];
}

const otherProjects: Project[] = [
  {
    title: '实时数据可视化大屏',
    description:
      '基于 Vue3 + ECharts 的企业级数据大屏，支持 50+ 图表类型，websocket 实时推送，自适应多分辨率。',
    tags: ['Vue3', 'ECharts', 'WebSocket', 'DataV'],
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#f59e0b',
    links: [
      { label: 'GitHub', href: '#' },
      { label: '演示', href: '#' },
    ],
  },
  {
    title: '分布式任务调度平台',
    description:
      '支持 Cron/依赖/事件触发的调度系统，可视化的 DAG 编排，任务失败自动重试与告警。',
    tags: ['Go', 'etcd', 'gRPC', 'React'],
    icon: <Layers className="w-5 h-5" />,
    color: '#10b981',
    links: [
      { label: 'GitHub', href: '#' },
      { label: '文档', href: '#' },
    ],
  },
  {
    title: '埋点数据治理工具',
    description:
      '一站式埋点管理平台，涵盖埋点设计、校验、血缘分析与下线治理，提升数据质量。',
    tags: ['Python', 'Neo4j', 'Vue', 'Flink'],
    icon: <Globe className="w-5 h-5" />,
    color: '#38bdf8',
    links: [
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    title: 'AI 数据标注平台',
    description:
      '支持图像、文本、语音多模态标注，内置质量抽检与模型预标注，效率提升 3 倍。',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Redis'],
    icon: <Sparkles className="w-5 h-5" />,
    color: '#f472b6',
    links: [
      { label: 'GitHub', href: '#' },
      { label: '演示', href: '#' },
    ],
  },
];

const projectIdMap: Record<string, string> = {
  '实时数据可视化大屏': 'data-visualization',
  '分布式任务调度平台': 'task-scheduler',
};

export default function Projects() {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="pt-24 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Project: Architecture Diagram */}
        <ArchitectureDiagram />

        {/* Divider */}
        <div className="my-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-text-muted font-mono">OTHER PROJECTS</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Other Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {otherProjects.map((project) => (
            <div
              key={project.title}
              className="project-card glass rounded-xl p-6 hover:ring-1 hover:ring-white/10 transition-all duration-300 group cursor-pointer"
              onClick={() => {
                const pid = projectIdMap[project.title];
                if (pid) navigate(`/project/${pid}`);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-2.5 rounded-lg"
                  style={{
                    backgroundColor: `${project.color}15`,
                    color: project.color,
                  }}
                >
                  {project.icon}
                </div>
                <div className="flex items-center gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => e.stopPropagation()}
                      className="text-text-muted hover:text-text-primary transition-colors text-xs flex items-center gap-1"
                    >
                      {link.label === 'GitHub' ? (
                        <Code className="w-3.5 h-3.5" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5" />
                      )}
                      {link.label}
                    </a>
                  ))}
                  {projectIdMap[project.title] && (
                    <span className="text-xs text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      详情 <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-xs font-mono border border-border text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
