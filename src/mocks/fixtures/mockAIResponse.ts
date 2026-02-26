import { SuccessEnvelope } from "@/types/api";

export const mockAIResponse = {
    request_id: "req_ai_1",
    data: {
        message: {
            id: "msg_1",
            role: "assistant",
            content: "I’ve prepared today’s dispatch plan.",
            created_at: new Date().toISOString()
        },
        drafts: [
            {
                id: "draft_1",
                type: "DISPATCH_PLAN",
                title: "Draft Dispatch Plan",
                summary: ["5 staff assigned", "315 shops allocated"],
                risks: [
                    { level: "WARN", text: "3 SKU shortages detected" }
                ],
                payload: { dispatch_date: "2026-02-16" },
                status: "DRAFT",
                created_at: new Date().toISOString()
            }
        ]
    }
};
