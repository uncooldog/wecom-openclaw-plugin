import { describe, expect, test } from "vitest";

import { shouldUseDynamicAgent } from "./dynamic-agent.js";

describe("shouldUseDynamicAgent", () => {
  const config = {
    channels: {
      wecom: {
        dynamicAgents: {
          enabled: true,
          dmCreateAgent: true,
          groupEnabled: true,
          adminUsers: ["HeYe"],
        },
      },
    },
  } as any;

  test("does not let adminUsers split group conversations away from the group agent", () => {
    expect(
      shouldUseDynamicAgent({
        chatType: "group",
        senderId: "HeYe",
        config,
      }),
    ).toBe(true);
  });

  test("keeps adminUsers on the main agent for direct messages", () => {
    expect(
      shouldUseDynamicAgent({
        chatType: "dm",
        senderId: "HeYe",
        config,
      }),
    ).toBe(false);
  });
});
