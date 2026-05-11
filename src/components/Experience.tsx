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
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: '哈啰出行',
    role: '高级数据开发工程师',
    period: '2021.07 - 2025.07',
    location: '上海',
    description: [
      '从 0 到 1 主导企业级数据中台建设，独立完成存算分离、元数据、指标、画像、查询、分析、看板等全链路模块',
      '设计并实现数据权限、调度系统、数据血缘、数据质量等数据治理体系',
      '基于 DDD 优化版代码设计，构建企业级 Maven 微服务项目，支撑日均亿级数据量',
      '独立部署 CI/CD + K8s 流程，完成从 VPN 到 K8s 的服务器开发与运维',
    ],
    skills: ['Java', 'Spring Boot', 'DDD', 'Maven', 'Kafka', 'Flink', 'K8s', 'CI/CD'],
  },
  {
    company: '兴趣岛',
    role: '数据中台开发工程师',
    period: '2025.07 - 至今',
    location: '广州',
    description: [
      '独立负责用户画像中台开发与维护，支撑 6000 万级用户的企业微信打标系统',
      '独立完成画像标签 API 设计与开发，保障高并发场景下的服务稳定性',
      '持续优化数据中台架构，推进数据血缘与质量监控体系建设',
    ],
    skills: ['Java', 'Spark', 'Hive', 'Airflow', '画像中台', '微服务'],
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

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-xs font-mono border border-border text-text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
