import { z } from "zod";

/* ============================= */
/* Base Types */
/* ============================= */

export const UUIDSchema = z.string().min(1);
export const ISODateSchema = z.string(); // optional: refine with regex

export const RequestIdSchema = z.string().min(1);

/* ============================= */
/* Global Envelopes */
/* ============================= */

export const ErrorEnvelopeSchema = z.object({
    request_id: RequestIdSchema,
    error: z.object({
        code: z.enum([
            "AUTH_REQUIRED",
            "FORBIDDEN",
            "VALIDATION_ERROR",
            "NOT_FOUND",
            "CONFLICT",
            "RATE_LIMITED",
            "INTERNAL_ERROR",
            "LLM_PROVIDER_ERROR"
        ]),
        message: z.string(),
        details: z.object({
            field_errors: z.array(
                z.object({
                    field: z.string(),
                    issue: z.string()
                })
            ).optional(),
            hint: z.string().optional()
        }).optional()
    })
});

export const SuccessEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        request_id: RequestIdSchema,
        data: dataSchema
    });

/* ============================= */
/* Auth / Me */
/* ============================= */

export const UserRoleSchema = z.enum(["ADMIN", "MANAGER", "STAFF"]);

export const MeSchema = SuccessEnvelopeSchema(
    z.object({
        user: z.object({
            user_id: UUIDSchema,
            full_name: z.string(),
            email: z.string().email()
        }),
        membership: z.object({
            tenant_id: UUIDSchema,
            tenant_name: z.string(),
            role: UserRoleSchema,
            staff_id: UUIDSchema.nullable()
        })
    })
);

/* ============================= */
/* Drafts */
/* ============================= */

export const DraftTypeSchema = z.enum([
    "DISPATCH_PLAN",
    "SHOP_IMPORT",
    "INVOICE_GENERATION",
    "INVENTORY_UPDATE",
    "OVERRIDE_PLAN"
]);

export const DraftStatusSchema = z.enum([
    "DRAFT",
    "APPROVED",
    "REJECTED",
    "EXECUTED",
    "FAILED"
]);

export const DraftRiskSchema = z.object({
    level: z.enum(["INFO", "WARN", "CRITICAL"]),
    text: z.string()
});

export const DraftSchema = z.object({
    id: UUIDSchema,
    type: DraftTypeSchema,
    title: z.string(),
    summary: z.array(z.string()),
    risks: z.array(DraftRiskSchema),
    payload: z.record(z.any()),
    status: DraftStatusSchema,
    created_at: ISODateSchema
});

/* ============================= */
/* AI Chat Response */
/* ============================= */

export const ChatMessageSchema = z.object({
    id: UUIDSchema,
    role: z.enum(["user", "assistant"]),
    content: z.string(),
    created_at: ISODateSchema
});

export const ToolTraceCallSchema = z.object({
    tool_name: z.string(),
    status: z.enum(["PLANNED", "VALIDATED", "FAILED"]),
    args_preview: z.record(z.any()),
    error: z.object({
        code: z.string(),
        message: z.string()
    }).optional()
});

export const AIChatResponseSchema = SuccessEnvelopeSchema(
    z.object({
        message: ChatMessageSchema,
        drafts: z.array(DraftSchema),
        tool_trace: z.object({
            enabled: z.boolean(),
            calls: z.array(ToolTraceCallSchema)
        }).optional()
    })
);

/* ============================= */
/* Dispatch */
/* ============================= */

export const DispatchStatusSchema = z.enum([
    "PLANNED",
    "APPROVED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED"
]);

export const StopStatusSchema = z.enum([
    "PENDING",
    "ARRIVED",
    "DELIVERED",
    "FAILED",
    "SKIPPED"
]);

export const DispatchSummarySchema = z.object({
    staff_count: z.number(),
    eligible_shops_count: z.number(),
    assigned_shops_count: z.number(),
    line_items_count: z.number(),
    shortage_count: z.number()
});

export const DispatchRunListItemSchema = z.object({
    id: UUIDSchema,
    dispatch_date: z.string(),
    status: DispatchStatusSchema,
    summary: DispatchSummarySchema,
    confidence_score: z.number(),
    created_at: ISODateSchema
});

/* ============================= */
/* Stop Schema */
/* ============================= */

export const StopItemSchema = z.object({
    id: UUIDSchema,
    shop_id: UUIDSchema,
    shop_name: z.string(),
    stop_order: z.number(),
    status: StopStatusSchema,
    sla_risk: z.enum(["LOW", "MED", "HIGH"]),
    qty_summary: z.string()
});
