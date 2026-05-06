import * as os from "os";
import * as path from "path";
import { describe, expect, it } from "vitest";
import { getScopedMediaLocalRoots } from "./monitor.js";

describe("getScopedMediaLocalRoots", () => {
  it("allows the current agent workspace and OpenClaw outbound media cache", () => {
    const workspace = "/Users/leo/.openclaw/workspace/wecom-default-group-demo";

    expect(getScopedMediaLocalRoots(undefined, workspace)).toEqual([
      workspace,
      path.join(os.homedir(), ".openclaw", "media", "outbound"),
    ]);
  });
});
