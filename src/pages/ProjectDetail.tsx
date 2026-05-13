import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Database,
  BarChart3,
  Layers,
  Code2,
  GitBranch,
  Workflow,
  Sparkles,
  Search,
  Table2,
  Monitor,
  CheckCircle2,
  ExternalLink,
  Code as CodeIcon,
} from 'lucide-react';

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
  kpis: { value: string; label: string }[];
  overview: string;
  features: { title: string; desc: string; icon: React.ReactNode }[];
  techStack: { category: string; items: string[] }[];
  highlights: string[];
  links: { label: string; url: string; icon: React.ReactNode }[];
}

const projectsData: Record<string, ProjectData> = {
  'data-visualization': {
    id: 'data-visualization',
    title: '实时数据可视化大屏',
    subtitle: '企业级数据大屏解决方案',
    description:
      '基于 Vue3 + ECharts 的企业级数据大屏，支持 50+ 图表类型，WebSocket 实时推送，自适应多分辨率。',
    tags: ['Vue3', 'ECharts', 'WebSocket', 'DataV'],
    color: '#f59e0b',
    icon: <Monitor className="w-8 h-8" />,
    kpis: [
      { value: '50+', label: '图表类型' },
      { value: '4K', label: '分辨率适配' },
      { value: '< 100ms', label: '推送延迟' },
      { value: '20+', label: '大屏模板' },
    ],
    overview:
      '实时数据可视化大屏是一款面向企业运营监控的可视化解决方案。支持多种数据源接入，通过 WebSocket 实现毫秒级数据推送，内置丰富的图表组件与大屏模板，可快速搭建业务监控看板。',
    features: [
      {
        title: '实时数据推送',
        desc: '基于 WebSocket 的长连接方案，支持毫秒级数据更新与断线重连。',
        icon: <GitBranch className="w-5 h-5" />,
      },
      {
        title: '自适应布局',
        desc: '采用 rem + scale 混合方案，完美适配从 1080P 到 4K 的多分辨率屏幕。',
        icon: <Layers className="w-5 h-5" />,
      },
      {
        title: '图表工厂',
        desc: '封装 50+ 常用图表，支持主题切换、动画配置与交互联动。',
        icon: <BarChart3 className="w-5 h-5" />,
      },
    ],
    techStack: [
      { category: '前端框架', items: ['Vue 3', 'TypeScript', 'Vite'] },
      { category: '可视化', items: ['ECharts 5', 'D3.js'] },
      { category: '实时通信', items: ['WebSocket', 'Socket.IO'] },
      { category: '样式方案', items: ['SCSS', 'Tailwind CSS'] },
    ],
    highlights: [
      '自研大屏设计器，支持拖拽式组件编排与实时预览',
      'WebSocket 连接池管理，支持千级并发数据推送',
      '图表组件统一封装，props 驱动配置，降低 60% 重复代码',
      '提供大屏模板市场，业务方可基于模板 5 分钟搭建看板',
    ],
    links: [
      {
        label: '查看源码',
        url: 'https://github.com',
        icon: <CodeIcon className="w-4 h-4" />,
      },
      {
        label: '在线演示',
        url: '#',
        icon: <ExternalLink className="w-4 h-4" />,
      },
    ],
  },
  'task-scheduler': {
    id: 'task-scheduler',
    title: '分布式任务调度平台',
    subtitle: '可视化 DAG 编排与智能调度',
    description:
      '支持 Cron/依赖/事件触发的调度系统，可视化的 DAG 编排，任务失败自动重试与告警。',
    tags: ['Go', 'etcd', 'gRPC', 'React'],
    color: '#10b981',
    icon: <Workflow className="w-8 h-8" />,
    kpis: [
      { value: '10万+', label: '日调度量' },
      { value: '< 1s', label: '调度延迟' },
      { value: '99.99%', label: '成功率' },
      { value: '3', label: '重试策略' },
    ],
    overview:
      '分布式任务调度平台是一个支持大规模任务编排与调度执行的企业级系统。提供可视化的 DAG 工作流设计器，支持 Cron、依赖触发、事件驱动等多种调度模式，具备完善的失败重试、告警通知与监控大盘能力。',
    features: [
      {
        title: 'DAG 工作流编排',
        desc: '可视化拖拽设计器，支持复杂依赖关系配置与条件分支。',
        icon: <GitBranch className="w-5 h-5" />,
      },
      {
        title: '多模式调度',
        desc: '支持 Cron 定时、上游依赖、消息事件三种触发方式。',
        icon: <Sparkles className="w-5 h-5" />,
      },
      {
        title: '智能容错',
        desc: '失败自动重试、超时熔断、失败告警与人工介入机制。',
        icon: <CheckCircle2 className="w-5 h-5" />,
      },
    ],
    techStack: [
      { category: '后端', items: ['Go', 'gRPC', 'etcd'] },
      { category: '前端', items: ['React', 'Ant Design'] },
      { category: '数据库', items: ['MySQL', 'Redis'] },
      { category: '消息队列', items: ['Kafka', 'RabbitMQ'] },
    ],
    highlights: [
      '基于 etcd 实现分布式锁与任务分片，支持水平扩展',
      '调度引擎采用时间轮算法，百万级任务秒级调度',
      'DAG 执行器支持断点续跑与失败任务单独重试',
      '完善的监控大盘，任务执行链路全链路追踪',
    ],
    links: [
      {
        label: '查看源码',
        url: 'https://github.com',
        icon: <CodeIcon className="w-4 h-4" />,
      },
      {
        label: '技术文档',
        url: '#',
        icon: <ExternalLink className="w-4 h-4" />,
      },
    ],
  },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
        <div className="text-center">
          <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">项目未找到</h1>
          <p className="text-text-secondary mb-6">该项目详情暂不可用</p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${project.color}, transparent 60%)`,
          }}
        />
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16 relative z-10">
          <button
            onClick={() => navigate('/')}
            className="mb-8 text-text-muted hover:text-text-primary transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>

          <div className="flex items-start gap-5 mb-6">
            <div
              className="p-3 rounded-xl"
              style={{
                backgroundColor: `${project.color}15`,
                color: project.color,
              }}
            >
              {project.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-text-secondary">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-text-secondary max-w-3xl leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md text-xs font-mono border border-border text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors flex items-center gap-2"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="glass rounded-xl p-5 text-center hover:border-accent/30 transition-colors"
            >
              <div className="text-2xl font-bold text-text-primary mb-1">
                {kpi.value}
              </div>
              <div className="text-xs text-text-muted">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-accent" />
          项目概述
        </h2>
        <div className="glass rounded-xl p-6">
          <p className="text-text-secondary leading-relaxed">{project.overview}</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-accent" />
          核心功能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.features.map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-xl p-5 hover:ring-1 hover:ring-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-text-primary">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-accent" />
          技术栈
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {project.techStack.map((stack) => (
            <div key={stack.category} className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md text-xs font-mono bg-white/5 text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          技术亮点
        </h2>
        <div className="glass rounded-xl p-6">
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-text-secondary"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: project.color }}
                />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-text-primary mb-3">
            对项目感兴趣？
          </h2>
          <p className="text-text-secondary mb-6">
            欢迎查看更多细节或与我交流技术方案
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/#contact')}
              className="px-5 py-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors flex items-center gap-2"
            >
              联系我
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 glass text-text-primary rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
