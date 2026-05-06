import type { PluginRuntime } from "openclaw/plugin-sdk/core";

let runtime: PluginRuntime | undefined;

function setWeComRuntime(nextRuntime: PluginRuntime): void {
  runtime = nextRuntime;
}

function getWeComRuntime(): PluginRuntime {
  if (!runtime) {
    throw new Error("WeCom runtime not initialized");
  }
  return runtime;
}

export { setWeComRuntime, getWeComRuntime };
