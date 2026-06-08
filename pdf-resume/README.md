# PDF 简历编辑说明

这个目录用于维护从 `/Users/cy/Downloads/简历_闫晨阳.pdf` 重建出来的可编辑 HTML 简历。

## 文件说明

- `resume.html`：简历正文。日常改姓名、联系方式、经历、项目内容时主要编辑这个文件。
- `resume.css`：A4 页面、左右栏、字体、颜色和打印样式。
- `简历_闫晨阳_edited.pdf`：通过 Chrome headless 从 HTML 导出的新版 PDF。

## 导出 PDF

在项目根目录 `/Users/cy/Workspace/react/resume` 执行：

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless \
  --disable-gpu \
  --disable-background-networking \
  --disable-component-update \
  --disable-crash-reporter \
  --disable-extensions \
  --disable-sync \
  --no-first-run \
  --no-default-browser-check \
  --allow-file-access-from-files \
  --user-data-dir=/private/tmp/chrome-pdf-resume \
  --print-to-pdf=/Users/cy/Workspace/react/resume/pdf-resume/简历_闫晨阳_edited.pdf \
  --print-to-pdf-no-header \
  file:///Users/cy/Workspace/react/resume/pdf-resume/resume.html
```

如果内容变长导致 PDF 变成两页，优先缩短项目描述；其次微调 `resume.css` 里的 `.project-item li` 字号、行高或段落间距。

如果终端已经显示 `bytes written to file ...简历_闫晨阳_edited.pdf`，但 Chrome 命令没有自动退出，可以执行：

```bash
pkill -f chrome-pdf-resume
```

这个命令只结束使用 `/private/tmp/chrome-pdf-resume` 临时 profile 的本次 headless 导出进程。

## 验证 PDF

```bash
/Users/cy/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pdfinfo \
  /Users/cy/Workspace/react/resume/pdf-resume/简历_闫晨阳_edited.pdf
```

重点确认 `Pages: 1` 和 `Page size` 为 A4。
