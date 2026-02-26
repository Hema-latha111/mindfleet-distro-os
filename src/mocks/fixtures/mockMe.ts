import { SuccessEnvelope } from "@/types/api";

export const mockMe: SuccessEnvelope<any> = {
    request_id: "req_mock_1",
    data: {
        user: {
            user_id: "user_1",
            full_name: "Kavin",
            email: "admin@mindfleet.com"
        },
        membership: {
            tenant_id: "tenant_mylk",
            tenant_name: "MYLK Factory",
            role: "ADMIN",
            staff_id: null
        }
    }
};
