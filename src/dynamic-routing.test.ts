import { describe, expect, test } from "vitest";

import { processDynamicRouting } from "./dynamic-routing.js";

describe("processDynamicRouting", () => {
  test("builds group session keys in OpenClaw's parseable conversation format", () => {
    const result = processDynamicRouting({
      route: {
        agentId: "wecom-default-group-old",
        sessionKey: "agent:wecom-default-group-old:wecom:default:group:wrZY3JDgAAkjPMH9NAd1NvicEJNwKYdA",
        matchedBy: "default",
        accountId: "default",
      },
      config: {
        channels: {
          wecom: {
            dynamicAgents: {
              enabled: true,
              groupEnabled: true,
            },
          },
        },
      } as any,
      core: {} as any,
      accountId: "default",
      chatType: "group",
      chatId: "wrZY3JDgAAkjPMH9NAd1NvicEJNwKYdA",
      senderId: "HeYe",
    });

    expect(result.finalSessionKey).toBe(
      "agent:wecom-default-group-wrzy3jdgaakjpmh9nad1nvicejnwkyda:wecom:group:wrZY3JDgAAkjPMH9NAd1NvicEJNwKYdA",
    );
  });

  test("keeps account scoping for dynamic direct message session keys", () => {
    const result = processDynamicRouting({
      route: {
        agentId: "wecom-default-dm-old",
        sessionKey: "agent:wecom-default-dm-old:wecom:default:direct:HeYe",
        matchedBy: "default",
        accountId: "default",
      },
      config: {
        channels: {
          wecom: {
            dynamicAgents: {
              enabled: true,
              dmCreateAgent: true,
            },
          },
        },
      } as any,
      core: {} as any,
      accountId: "default",
      chatType: "dm",
      chatId: "HeYe",
      senderId: "OtherUser",
    });

    expect(result.finalSessionKey).toBe(
      "agent:wecom-default-dm-heye:wecom:default:direct:HeYe",
    );
  });
});
