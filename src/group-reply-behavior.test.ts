import { describe, expect, test } from "vitest";

import { buildWeComGroupReplyBehavior } from "./group-reply-behavior.js";

describe("buildWeComGroupReplyBehavior", () => {
  test("makes group final replies visible in WeCom", () => {
    expect(buildWeComGroupReplyBehavior("group")).toEqual({
      wasMentioned: true,
      sourceReplyDeliveryMode: "automatic",
    });
  });

  test("keeps direct message reply behavior unchanged", () => {
    expect(buildWeComGroupReplyBehavior("direct")).toEqual({
      wasMentioned: undefined,
      sourceReplyDeliveryMode: undefined,
    });
  });
});
