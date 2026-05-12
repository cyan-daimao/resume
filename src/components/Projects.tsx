import { Database, Server, Shield, BarChart3, PieChart, Box } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';

interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  techs: string[];
  github: string;
  icon: React.ReactNode;
  color: string;
}

const projects: ProjectItem[] = [
  {
    id: 'arch',
    title: 'cyan-arch',
    desc: '基础依赖库，cyan 数据平台的公共组件。封装 Spring 生态、MyBatis Plus、Nacos、日志等常用依赖。',
    techs: ['Java', 'Spring Boot', 'Nacos', 'Maven'],
    github: 'https://github.com/cyan-daimao/cyan-arch',
    icon: <Box className="w-5 h-5" />,
    color: '#94a3b8',
  },
  {
    id: 'dataman',
    title: 'cyan-dataman',
    desc: '数据采集 + 元数据平台。CDC 数据入湖（Debezium + Kafka + Flink），Gravitino + Iceberg 元数据治理。',
    techs: ['Java', 'Flink', 'Kafka', 'Gravitino'],
    github: 'https://github.com/cyan-daimao/cyan-dataman',
    icon: <Database className="w-5 h-5" />,
    color: '#10b981',
  },
  {
    id: 'datagateway',
    title: 'cyan-datagateway',
    desc: '数据网关，StarRocks / Spark / Flink 的统一 SQL 执行入口。智能路由、资源分配。',
    techs: ['Java', 'Spark', 'StarRocks', 'SQL 路由'],
    github: 'https://github.com/cyan-daimao/cyan-datagateway',
    icon: <Server className="w-5 h-5" />,
    color: '#38bdf8',
  },
  {
    id: 'dataauth',
    title: 'cyan-dataauth',
    desc: '数据权限中心，提供表级、行级、列级权限控制。对外权限申请，对内 SQL 增强服务。',
    techs: ['Java', 'Spring Boot', '权限管控', 'SQL 改写'],
    github: 'https://github.com/cyan-daimao/cyan-dataauth',
    icon: <Shield className="w-5 h-5" />,
    color: '#f59e0b',
  },
  {
    id: 'datametric',
    title: 'cyan-datametric',
    desc: '指标平台，数据应用服务的基石。指标维度管理、DSL 查询语言，通过关联关系图谱智能聚合。',
    techs: ['Java', 'DSL', '指标聚合', '图谱计算'],
    github: 'https://github.com/cyan-daimao/cyan-datametric',
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#8b5cf6',
  },
  {
    id: 'databi',
    title: 'cyan-databi',
    desc: '智能分析平台，基于指标平台创建图表，支持 ChatBI 自然语言生成图表。图表 + 布局组成数据看板。',
    techs: ['React', 'TypeScript', 'ChatBI', '数据看板'],
    github: 'https://github.com/cyan-daimao/cyan-databi',
    icon: <PieChart className="w-5 h-5" />,
    color: '#f472b6',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="pt-24 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow border border-accent/20 text-accent text-xs font-mono mb-4">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            OPEN SOURCE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            开源项目
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            从数据采集到智能分析，构建完整的数据中台技术栈
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass rounded-xl p-5 border border-border hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${project.color}15`, color: project.color }}
                >
                  {project.icon}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
                  title="查看源码"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>

              <h3 className="text-base font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs font-mono border border-border text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <ArchitectureDiagram />
      </div>
    </section>
  );
}
