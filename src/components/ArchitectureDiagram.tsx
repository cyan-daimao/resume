import { useState } from 'react';
import {
  Database,
  Server,
  Cpu,
  Cloud,
  BarChart3,
  ArrowRight,
  Layers,
  Code,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Layer {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  items: string[];
  detail: string;
  responsibilities: string[];
  highlights: string[];
}

const layers: Layer[] = [
  {
    id: 'ingest',
    title: '数据采集层',
    icon: <Cloud className="w-5 h-5" />,
    color: '#10b981',
    items: ['Kafka', 'Debezium', 'Flink'],
    detail: '基于 Flink + Kafka + Debezium 的 CDC 实时数据采集与接入',
    responsibilities: [
      'MySQL CDC 实时数据捕获与入湖链路设计与实现',
      '数据源配置管理，支持多数据源接入与统一调度',
      '数据入湖链路编排，保障数据一致性与完整性',
    ],
    highlights: [
      'Debezium + Kafka + Flink CDC 实时链路',
      '断点续传与 Schema 变更自动适配',
      'Spark Connect CDC 双通道采集',
    ],
  },
  {
    id: 'storage',
    title: '数据存储层',
    icon: <Database className="w-5 h-5" />,
    color: '#f59e0b',
    items: ['Iceberg', 'RustFS', 'REST Catalog'],
    detail: '湖仓一体架构，支持时间旅行、小文件合并与冷热数据分层存储',
    responsibilities: [
      'RustFS 自研对象存储，为数据湖提供高可靠存储底座',
      'Iceberg 开放表格式管理，支持 ACID 与隐藏分区',
      'REST Catalog 标准化元数据接口，统一多引擎访问',
    ],
    highlights: [
      '自研 RustFS 对象存储，存算分离架构',
      'Iceberg 时间旅行(Time Travel)回溯',
      'REST Catalog 统一元数据服务',
    ],
  },
  {
    id: 'compute',
    title: '数据计算层',
    icon: <Cpu className="w-5 h-5" />,
    color: '#8b5cf6',
    items: ['Spark', 'StarRocks'],
    detail: 'Spark 负责离线数据加工，StarRocks 提供高性能 OLAP 分析（Flink 加工链路规划中）',
    responsibilities: [
      'Spark 离线数据加工与 ETL  pipeline 构建',
      'StarRocks 高性能 OLAP 分析引擎接入',
      '多引擎统一调度与资源管理',
    ],
    highlights: [
      'Spark 4.0.2 + Scala 2.13 批处理',
      'StarRocks 高性能 OLAP 即席查询',
      '多引擎统一 SQL 执行调度',
    ],
  },
  {
    id: 'service',
    title: '数据服务层',
    icon: <Server className="w-5 h-5" />,
    color: '#38bdf8',
    items: ['API网关', '指标平台', '元数据', '数据血缘(规划中)', '质量监控(规划中)'],
    detail: '统一数据服务出口，指标平台规范口径，血缘与质量持续完善',
    responsibilities: [
      'DataGateway 统一 SQL 执行入口与智能路由',
      '指标平台维度管理与 DSL 查询语言设计',
      'DataAuth 表/行/列三级细粒度权限管控',
    ],
    highlights: [
      'DataGateway 多引擎统一 SQL 路由',
      '指标平台关联关系图谱自动推导 JOIN',
      'DataAuth SQL 增强运行时权限注入',
    ],
  },
  {
    id: 'app',
    title: '数据应用层',
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#f472b6',
    items: ['自助报表', '用户画像', 'ChatBI', '智能推荐'],
    detail: '面向业务的数据产品，ChatBI 自然语言驱动分析，助力业务决策',
    responsibilities: [
      'ChatBI 自然语言对话生成图表',
      '用户画像中台支撑 6000 万级标签体系',
      '数据看板拖拽编排与实时刷新',
    ],
    highlights: [
      'ChatBI 自然语言生成数据图表',
      '6000 万级用户画像标签自动打标',
      '图表原子化 + 布局拖拽组成看板',
    ],
  },
];

export default function ArchitectureDiagram() {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow border border-accent/20 text-accent text-xs font-mono mb-4">
          <Layers className="w-3 h-3" />
          CORE PROJECT
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          一站式数据中台
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          项目介绍
        </p>
      </div>


      {/* Architecture Diagram */}
      <div className="relative">
        {/* Layers */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          {layers.map((layer, index) => (
            <div key={layer.id} className="w-full flex flex-col items-center">
              {/* Arrow between layers */}
              {index > 0 && (
                <div className="arch-arrow flex items-center justify-center py-2">
                  <ArrowRight className="w-4 h-4 text-text-muted rotate-90" />
                </div>
              )}

              {/* Layer Card */}
              <div
                className={`arch-layer w-full glass rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  activeLayer === layer.id
                    ? 'ring-1 ring-white/20 bg-white/5'
                    : 'hover:bg-white/5'
                }`}
                style={{ borderLeft: `3px solid ${layer.color}` }}
                onClick={() =>
                  setActiveLayer(activeLayer === layer.id ? null : layer.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${layer.color}15`, color: layer.color }}
                    >
                      {layer.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">{layer.detail}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end max-w-[45%]">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded-md text-xs font-mono border"
                        style={{
                          borderColor: `${layer.color}30`,
                          color: layer.color,
                          backgroundColor: `${layer.color}10`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded detail */}
                {activeLayer === layer.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
                      <div>
                        <h4 className="text-text-primary font-medium mb-2">核心职责</h4>
                        <ul className="space-y-1">
                          {layer.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-medium mb-2">技术亮点</h4>
                        <ul className="space-y-1">
                          {layer.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-accent-warm mt-1.5 shrink-0" />
                              {hl}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => navigate('/project/cyan-dataman')}
          className="px-5 py-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          查看项目详情
        </button>
        <a
          href="https://github.com/cyan-daimao"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 glass text-text-primary rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <Code className="w-4 h-4" />
          查看源码
        </a>
      </div>
    </div>
  );
}
