export type WeComSourceReplyDeliveryMode = "automatic" | "message_tool_only";

export function buildWeComGroupReplyBehavior(chatType: string): {
  wasMentioned: true | undefined;
  sourceReplyDeliveryMode: WeComSourceReplyDeliveryMode | undefined;
} {
  if (chatType !== "group") {
    return {
      wasMentioned: undefined,
      sourceReplyDeliveryMode: undefined,
    };
  }

  return {
    wasMentioned: true,
    sourceReplyDeliveryMode: "automatic",
  };
}
