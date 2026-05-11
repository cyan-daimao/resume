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
}

const layers: Layer[] = [
  {
    id: 'ingest',
    title: '数据采集层',
    icon: <Cloud className="w-5 h-5" />,
    color: '#10b981',
    items: ['Kafka', 'debezium', 'Flink', 'Spark'],
    detail: '多源异构数据统一接入，支持实时流与批量采集',
  },
  {
    id: 'storage',
    title: '数据存储层',
    icon: <Database className="w-5 h-5" />,
    color: '#f59e0b',
    items: ['Iceberg',  'rustfs'],
    detail: '湖仓一体架构，冷热数据分层存储，成本与性能平衡',
  },
  {
    id: 'compute',
    title: '数据计算层',
    icon: <Cpu className="w-5 h-5" />,
    color: '#8b5cf6',
    items: ['Flink', 'Spark', 'StarRocks'],
    detail: '流批一体计算引擎，毫秒级实时处理与离线分析',
  },
  {
    id: 'service',
    title: '数据服务层',
    icon: <Server className="w-5 h-5" />,
    color: '#38bdf8',
    items: ['API网关', '数据血缘', '元数据', '质量监控'],
    detail: '统一数据服务出口，血缘追踪与质量治理',
  },
  {
    id: 'app',
    title: '数据应用层',
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#f472b6',
    items: ['实时大屏', '用户画像', '智能推荐', '自助分析'],
    detail: '面向业务的数据产品，驱动决策与增长',
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
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent" />
                            负责 {layer.title} 的设计与实现
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent" />
                            保障高可用与可扩展性
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent" />
                            持续性能优化与监控
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-medium mb-2">技术亮点</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent-warm" />
                            自研组件提升开发效率 40%
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent-warm" />
                            故障恢复时间 &lt; 30s
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent-warm" />
                            支撑 100+ 业务方调用
                          </li>
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
