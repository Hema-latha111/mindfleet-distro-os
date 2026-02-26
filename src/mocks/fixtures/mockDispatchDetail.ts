import { SuccessEnvelope } from "@/types/api";

export const mockDispatchDetail = {
    request_id: "req_dispatch_detail_1",
    data: {
        dispatch_run: {
            id: "dispatch_1",
            dispatch_date: "2026-02-16",
            status: "APPROVED",
            objective_config: {
                distance: 0.6,
                sla: 0.3,
                balance: 0.1
            },
            constraints_used: {},
            inputs_hash: "abc123hash",
            confidence_score: 0.87,
            created_by: { user_id: "user_1", name: "Kavin" },
            approved_by: { user_id: "user_1", name: "Kavin" },
            approved_at: new Date().toISOString()
        },
        assignments: [
            {
                id: "assign_1",
                staff_id: "staff_1",
                staff_name: "Ravi",
                capacity_stops: 50,
                metrics: {
                    stops_count: 48,
                    distance_est_km: 21,
                    sla_risk_score: 0.2
                },
                stops: [
                    {
                        id: "stop_1",
                        shop_id: "shop_1",
                        shop_name: "Murugan Stores",
                        stop_order: 1,
                        status: "PENDING",
                        sla_risk: "LOW",
                        qty_summary: "Curd 125g x 20"
                    }
                ]
            }
        ]
    }
};
