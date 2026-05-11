import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    '可用命令：',
    '  whoami    - 关于我',
    '  skills    - 技术栈',
    '  projects  - 项目经验',
    '  contact   - 联系方式',
    '  clear     - 清屏',
    '  echo      - 回显文本',
  ],
  whoami: [
    '┌─────────────────────────────────────┐',
    '│  姓名: 闫晨阳                        │',
    '│  身份: VibeCoding 超级个体            │',
    '│  职位: 数据中台开发工程师               │',
    '│  经验: 5 年数据中台全链路独立开发        │',
    '│  专注: 微服务架构 / DDD / 云原生 DevOps │',
    '│  格言: "从 0 到 1，让数据产生价值"      │',
    '└─────────────────────────────────────┘',
  ],
  skills: [
    '[数据中台全链路] 存算分离 · 元数据 · 指标 · 画像 · 查询 · 分析 · 看板',
    '[数据治理]       权限 · 调度 · 血缘 · 质量',
    '[后端架构]       Java · 微服务 · DDD · Maven · Spring Boot',
    '[前端开发]       React · TypeScript · Vue3 · ECharts · Ant Design',
    '[云原生 DevOps]  K8s · Docker · CI/CD · Jenkins · 测试服务',
    '[基础设施]       VPN · Linux · Shell · 服务器运维',
  ],
  projects: [
    '1. Cyan DataMan — 一站式数据治理与智能分析平台',
    '   - 覆盖元数据、指标、SQL 探索、数据工场、BI 可视化、ChatBI',
    '   - 技术: React + TypeScript + Vite + Ant Design + ECharts',
    '',
    '2. 企业级数据中台（独立开发）',
    '   - 从 0 到 1 完成全链路数据中台建设',
    '   - 涵盖存算分离、元数据、指标、画像、权限、调度、血缘、质量',
    '',
    '3. 企业级测试服务平台（从 0 到 1）',
    '   - 独立搭建 CI/CD + K8s 部署流程',
    '   - 从 VPN 到 K8s 的完整服务器开发经验',
  ],
  contact: [
    '手机号:   17338200219',
    '邮箱:     daimao2817@gmail.com',
    '邮箱:     a1624000875@163.com',
    'GitHub:   github.com/cyan-daimao',
    '',
    '欢迎交流技术、探讨合作机会！',
  ],
};

const WELCOME = [
  '┌────────────────────────────────────────────────────────────┐',
  '│                                                            │',
  '│                                                            │',
  '│              数据中台开发工程师 · 个人终端                     │',
  '│                                                            │',
  '└────────────────────────────────────────────────────────────┘',
  '',
  '输入 help 查看可用命令',
  '',
];

const AUTO_COMMANDS = ['whoami', 'skills', 'projects', 'contact', 'help'];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(
    WELCOME.map((l) => ({ type: 'output', content: l }))
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const executeRef = useRef<(cmd: string) => void>(() => {});

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const addOutput = useCallback((content: string) => {
    setLines((prev) => [...prev, { type: 'output', content }]);
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setLines((prev) => [
        ...prev,
        { type: 'input', content: `个人简历 ~ $ ${trimmed}` },
      ]);

      const [command, ...args] = trimmed.split(' ');

      switch (command.toLowerCase()) {
        case 'help':
        case 'whoami':
        case 'skills':
        case 'projects':
        case 'contact':
          COMMANDS[command.toLowerCase()].forEach((line, i) => {
            setTimeout(() => addOutput(line), i * 30);
          });
          break;
        case 'clear':
          setLines([]);
          break;
        case 'echo':
          addOutput(args.join(' ') || '');
          break;
        case 'ls':
          addOutput('profile.ts  skills.md  projects/  contact.json');
          break;
        case 'cat':
          if (args[0] === 'profile.ts') {
            COMMANDS.whoami.forEach((line, i) => {
              setTimeout(() => addOutput(line), i * 30);
            });
          } else {
            addOutput(`cat: ${args[0] || ''}: No such file or directory`);
          }
          break;
        default:
          addOutput(`command not found: ${command}. Type 'help' for available commands.`);
      }
    },
    [addOutput]
  );

  executeRef.current = executeCommand;

  useEffect(() => {
    let index = 0;

    const runNext = () => {
      if (index >= AUTO_COMMANDS.length) {
        setIsAutoRunning(false);
        return;
      }
      executeRef.current(AUTO_COMMANDS[index]);
      index++;
      setTimeout(runNext, 1000);
    };

    const timer = setTimeout(runNext, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    executeCommand(input);
    setHistory((prev) => [...prev.slice(0, -1), input, '']);
    setHistoryIndex(history.length);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      className="w-full glass rounded-xl overflow-hidden font-mono text-sm"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-card border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="ml-2 flex items-center gap-1.5 text-xs text-text-muted">
          <TerminalIcon className="w-3 h-3" />
          <span>个人简历 — zsh</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={bodyRef}
        className="p-4 min-h-[360px] max-h-[480px] overflow-y-auto bg-bg-primary/50"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed ${
              line.type === 'input' ? 'text-accent mt-2' : 'text-text-secondary'
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Input Line */}
        {!isAutoRunning && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-accent shrink-0">个人简历 ~ $</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-text-primary outline-none font-mono"
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse-glow inline-block w-2 h-4 bg-accent" />
          </form>
        )}
      </div>
    </div>
  );
}
