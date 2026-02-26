import { SuccessEnvelope } from "@/types/api";

export const mockDispatchList: SuccessEnvelope<any> = {
    request_id: "req_dispatch_1",
    data: {
        items: [
            {
                id: "dispatch_1",
                dispatch_date: "2026-02-16",
                status: "PLANNED",
                summary: {
                    staff_count: 5,
                    eligible_shops_count: 320,
                    assigned_shops_count: 315,
                    line_items_count: 890,
                    shortage_count: 3
                },
                confidence_score: 0.87,
                created_at: new Date().toISOString()
            }
        ]
    }
};
