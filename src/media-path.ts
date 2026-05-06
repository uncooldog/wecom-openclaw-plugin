import * as path from "path";

function stripMediaPrefix(mediaUrl: string): string {
  return mediaUrl.replace(/^\s*MEDIA\s*:\s*/i, "").trim();
}

function isRemoteUrl(mediaUrl: string): boolean {
  return /^https?:\/\//i.test(mediaUrl);
}

function isFileUrl(mediaUrl: string): boolean {
  return /^file:\/\//i.test(mediaUrl);
}

function isHomePath(mediaUrl: string): boolean {
  return mediaUrl === "~" || mediaUrl.startsWith("~/");
}

/**
 * 将 OpenClaw 输出的媒体路径归一化为插件可读取的路径。
 *
 * OpenClaw agent 在 sandbox 内通常会输出 `MEDIA:TOOLS.md` 或 `TOOLS.md`。
 * 对插件进程来说这个相对路径不能按进程 cwd 解析，必须按当前 agent workspace 解析。
 */
export function normalizeOutboundMediaUrl(mediaUrl: string, agentWorkspaceDir: string): string {
  const normalized = stripMediaPrefix(mediaUrl);
  if (
    isRemoteUrl(normalized) ||
    isFileUrl(normalized) ||
    isHomePath(normalized) ||
    path.isAbsolute(normalized)
  ) {
    return normalized;
  }
  return path.resolve(agentWorkspaceDir, normalized);
}
