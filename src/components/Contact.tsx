import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone,  Send } from 'lucide-react';
import { FaGoogle, FaWeixin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: '手机号',
    value: '17338200219',
    href: 'tel:17338200219',
    color: '#10b981',
  },
  {
    icon: <FaGoogle className="w-5 h-5" />,
    label: 'Gmail',
    value: 'daimao2817@gmail.com',
    href: 'mailto:daimao2817@gmail.com',
    color: '#EA4335',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: '163 邮箱',
    value: 'a1624000875@163.com',
    href: 'mailto:a1624000875@163.com',
    color: '#FC3F00',
  },
  {
    icon: <FaWeixin className="w-5 h-5" />,
    label: '微信',
    value: '17338200219',
    href: '#',
    color: '#07C160',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
        y: 30,
        duration: 0.6,
        stagger: 0.1,
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
    <section id="contact" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow border border-accent/20 text-accent text-xs font-mono mb-4">
            <Send className="w-3 h-3" />
            CONTACT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            联系我
          </h2>
          <p className="text-text-secondary">
            欢迎交流技术、探讨合作机会
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card glass rounded-xl p-5 flex items-center gap-4 hover:ring-1 hover:ring-white/10 transition-all group"
            >
              <div
                className="p-3 rounded-lg transition-colors group-hover:scale-110"
                style={{
                  backgroundColor: `${link.color}15`,
                  color: link.color,
                }}
              >
                {link.icon}
              </div>
              <div>
                <div className="text-sm text-text-muted">{link.label}</div>
                <div className="text-text-primary font-medium group-hover:text-accent transition-colors">
                  {link.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} 闫晨阳. Built with React + Tailwind + ❤️
          </p>
        </div>
      </div>
    </section>
  );
}
