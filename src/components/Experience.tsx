import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: '哈啰出行',
    role: '高级数据开发工程师',
    period: '2021.07 - 2025.07',
    location: '上海',
    description: [
      '从 0 到 1 主导数据应用平台建设，落地数据看板、自助分析等全链路数据产品，服务公司内部多业务线数据消费场景',
      '构建数据权限与数据质量治理体系，实现表级/字段级细粒度权限管控与自动化质量巡检',
      '推动数据服务化与自助化转型，显著降低业务方取数门槛，提升数据需求响应效率与数据消费体验',
    ],
  },
  {
    company: '兴趣岛',
    role: '数据中台开发工程师',
    period: '2025.07 - 至今',
    location: '广州',
    description: [
      '独立负责用户画像中台建设与维护，支撑 6000 万级用户的企业微信自动化标签体系',
      '设计并开发高并发画像标签 API，保障千万级调用量下的服务稳定性与低延迟响应',
      '在企业微信 20万/小时 接口限流瓶颈下，完成 3亿+ 标签自动打标，支撑精细化用户运营',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-item', {
        x: -40,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="pt-10 pb-24 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow border border-accent/20 text-accent text-xs font-mono mb-4">
            <Briefcase className="w-3 h-3" />
            EXPERIENCE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            工作经历
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="exp-item relative flex gap-6">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent border-4 border-bg-primary z-10 mt-2" />
                </div>

                {/* Content */}
                <div className="flex-1 glass rounded-xl p-6 hover:ring-1 hover:ring-white/10 transition-all">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {exp.company}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent/10 text-accent">
                      {exp.role}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="text-accent mt-1.5">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
