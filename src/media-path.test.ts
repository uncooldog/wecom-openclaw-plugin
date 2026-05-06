import { describe, expect, it } from "vitest";
import { normalizeOutboundMediaUrl } from "./media-path.js";

describe("normalizeOutboundMediaUrl", () => {
  const workspace = "/Users/leo/.openclaw/workspace/wecom-default-group-demo";

  it("resolves relative media paths against the current agent workspace", () => {
    expect(normalizeOutboundMediaUrl("TOOLS.md", workspace)).toBe(
      "/Users/leo/.openclaw/workspace/wecom-default-group-demo/TOOLS.md",
    );
  });

  it("strips MEDIA prefix before resolving relative paths", () => {
    expect(normalizeOutboundMediaUrl("MEDIA:TOOLS.md", workspace)).toBe(
      "/Users/leo/.openclaw/workspace/wecom-default-group-demo/TOOLS.md",
    );
  });

  it("keeps absolute paths and URLs unchanged", () => {
    expect(normalizeOutboundMediaUrl("/tmp/report.md", workspace)).toBe("/tmp/report.md");
    expect(normalizeOutboundMediaUrl("file:///tmp/report.md", workspace)).toBe("file:///tmp/report.md");
    expect(normalizeOutboundMediaUrl("https://example.com/report.md", workspace)).toBe("https://example.com/report.md");
  });
});
