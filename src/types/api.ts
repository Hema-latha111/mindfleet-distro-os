// ─── Global Envelopes ─────────────────────────────────────────────────────────

export type ISODateString = string;
export type UUID = string;

export interface SuccessEnvelope<T> {
    request_id: string;
    data: T;
}

export interface ErrorEnvelope {
    request_id: string;
    error: {
        code:
        | "AUTH_REQUIRED"
        | "FORBIDDEN"
        | "VALIDATION_ERROR"
        | "NOT_FOUND"
        | "CONFLICT"
        | "RATE_LIMITED"
        | "INTERNAL_ERROR"
        | "LLM_PROVIDER_ERROR";
        message: string;
        details?: {
            field_errors?: { field: string; issue: string }[];
            hint?: string;
        };
    };
}

// ─── Auth / Me ────────────────────────────────────────────────────────────────
export type UserRole = "ADMIN" | "MANAGER" | "STAFF";

export interface MeResponse {
    user: {
        user_id: UUID;
        full_name: string;
        email: string;
    };
    membership: {
        tenant_id: UUID;
        tenant_name: string;
        role: UserRole;
        staff_id: UUID | null;
    };
}

// ─── Drafts ───────────────────────────────────────────────────────────────────
export type DraftType =
    | "DISPATCH_PLAN"
    | "SHOP_IMPORT"
    | "INVOICE_GENERATION"
    | "INVENTORY_UPDATE"
    | "OVERRIDE_PLAN"
    | "ADD_STAFF";

export type DraftStatus =
    | "DRAFT"
    | "APPROVED"
    | "REJECTED"
    | "EXECUTED"
    | "FAILED";

export interface DraftRisk {
    level: "INFO" | "WARN" | "CRITICAL";
    text: string;
}

export interface Draft {
    id: UUID;
    type: DraftType;
    title: string;
    summary: string[];
    risks: DraftRisk[];
    payload: Record<string, unknown>;
    status: DraftStatus;
    created_at: ISODateString;
}

// ─── AI Chat ──────────────────────────────────────────────────────────────────
export interface ChatMessage {
    id: UUID;
    role: "user" | "assistant";
    content: string;
    created_at: ISODateString;
}

export interface ToolTraceCall {
    tool_name: string;
    status: "PLANNED" | "VALIDATED" | "FAILED";
    args_preview: Record<string, unknown>;
    error?: {
        code: string;
        message: string;
    };
}

export interface AIChatResponse {
    message: ChatMessage;
    drafts: Draft[];
    tool_trace?: {
        enabled: boolean;
        calls: ToolTraceCall[];
    };
}

// ─── Shops ────────────────────────────────────────────────────────────────────
export type CadenceType =
    | "DAILY"
    | "ALT_DAYS"
    | "WEEKLY"
    | "CUSTOM";

export type PriorityLevel = "NORMAL" | "HIGH" | "CRITICAL";

export interface ShopGeo {
    lat: number;
    lng: number;
    precision: "ROOFTOP" | "APPROX" | "UNKNOWN";
}

export interface ShopDeliveryConfig {
    cadence: CadenceType;
    delivery_days: Record<string, boolean>;
    priority: PriorityLevel;
    status: "ACTIVE" | "INACTIVE";
    last_delivery_at: ISODateString | null;
}

export interface ShopListItem {
    id: UUID;
    name: string;
    owner_name: string | null;
    phone: string | null;
    address: string | null;
    geo: ShopGeo;
    delivery: ShopDeliveryConfig;
    data_quality_score: number;
}

// ─── Inventory ────────────────────────────────────────────────────────────────
export interface SKUListItem {
    id: UUID;
    name: string;
    category: string;
    unit: string;
    active: boolean;
    pricing: {
        cost_price: number;
        sell_price: number;
    };
    stock: {
        available_qty: number;
        low_stock: boolean;
    };
    velocity: {
        avg_per_day_7d: number;
    };
}

export type InventoryMovementType =
    | "RECEIVE"
    | "ALLOCATE"
    | "DELIVER"
    | "ADJUST"
    | "RETURN";

export interface InventoryMovement {
    id: UUID;
    movement_type: InventoryMovementType;
    qty: number;
    ref: {
        entity_type: string;
        entity_id: UUID;
    };
    created_at: ISODateString;
}

// ─── Orders ──────────────────────────────────────────────────────────────────
export type OrderStatus = "DRAFT" | "CONFIRMED" | "CANCELLED";

export interface OrderListItem {
    id: UUID;
    shop_id: UUID;
    shop_name: string;
    order_date: string; // YYYY-MM-DD
    status: OrderStatus;
    created_at: ISODateString;
}

export interface OrderDetail {
    order: {
        id: UUID;
        shop_id: UUID;
        order_date: string;
        status: OrderStatus;
    };
    items: {
        sku_id: UUID;
        sku_name: string;
        qty: number;
    }[];
}

// ─── Dispatch ─────────────────────────────────────────────────────────────────
export type DispatchStatus = "PLANNED" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type StopStatus = "PENDING" | "ARRIVED" | "DELIVERED" | "FAILED" | "SKIPPED";

export interface DispatchSummary {
    staff_count: number;
    eligible_shops_count: number;
    assigned_shops_count: number;
    line_items_count: number;
    shortage_count: number;
}

export interface DispatchRunListItem {
    id: UUID;
    dispatch_date: string; // YYYY-MM-DD
    status: DispatchStatus;
    summary: DispatchSummary;
    confidence_score: number;
    created_at: ISODateString;
}

export interface StopItem {
    id: UUID;
    shop_id: UUID;
    shop_name: string;
    address?: string | null;
    stop_order: number;
    status: StopStatus;
    sla_risk: "LOW" | "MED" | "HIGH";
    qty_summary: string;
}

export interface StaffAssignment {
    id: UUID;
    staff_id: UUID;
    staff_name: string;
    capacity_stops: number;
    metrics: {
        stops_count: number;
        distance_est_km: number;
        sla_risk_score: number;
    };
    stops: StopItem[];
}

export interface DispatchRunDetail {
    dispatch_run: {
        id: UUID;
        dispatch_date: string;
        status: DispatchStatus;
        objective_config: { distance: number; sla: number; balance: number };
        constraints_used: Record<string, unknown>;
        inputs_hash: string;
        confidence_score: number;
        created_by: { user_id: UUID; name: string };
        approved_by?: { user_id: UUID; name: string };
        approved_at?: ISODateString | null;
    };
    Assignments: StaffAssignment[];
}

// ─── Deliveries ───────────────────────────────────────────────────────────────
export interface DeliveryStatusUpdate {
    id: UUID;
    dispatch_stop_id: UUID;
    status: "ARRIVED" | "DELIVERED" | "FAILED";
    delivered_at: ISODateString | null;
    failure_reason: string | null;
    note: string | null;
    geo?: {
        lat: number;
        lng: number;
        captured_at: ISODateString;
    };
}


export interface Override {
    id: UUID;
    reason: "CAPACITY" | "PRIORITY" | "SHOP_REQUEST" | "STAFF_ISSUE" | "OTHER";
    note: string | null;
    created_at: ISODateString;
}

export interface DispatchJournal {
    journal: {
        inputs_hash: string;
        objective_config: { distance: number; sla: number; balance: number };
        constraints_used: Record<string, unknown>;
        confidence_score: number;
        reasons_top: string[];
        risks: { level: "WARN" | "CRITICAL"; text: string }[];
    };
    timeline: {
        id: UUID;
        type: "PLANNED" | "APPROVED" | "OVERRIDDEN";
        timestamp: ISODateString;
        actor: { user_id: UUID; name: string };
        summary: string;
        diff: { before: unknown; after: unknown };
    }[];
}

// ─── Staff Route ──────────────────────────────────────────────────────────────
export interface StaffRouteResponse {
    dispatch_run: {
        id: UUID;
        dispatch_date: string;
        status: "APPROVED" | "IN_PROGRESS" | "COMPLETED";
    };
    staff: {
        staff_id: UUID;
        name: string;
    };
    summary: {
        total_stops: number;
        delivered: number;
        pending: number;
        failed: number;
    };
    stops: {
        dispatch_stop_id: UUID;
        stop_order: number;
        status: "PENDING" | "ARRIVED" | "DELIVERED" | "FAILED" | "SKIPPED";
        shop: {
            id: UUID;
            name: string;
            address: string | null;
            geo: { lat: number; lng: number };
        };
        items: {
            sku_id: UUID;
            sku_name: string;
            qty: number;
            unit: string;
        }[];
        notes: string | null;
    }[];
}

// ─── Invoices ─────────────────────────────────────────────────────────────────
export type InvoiceStatus = "ISSUED" | "PAID" | "PARTIAL" | "VOID";

export interface InvoiceListItem {
    id: UUID;
    invoice_date: string; // YYYY-MM-DD
    shop: { id: UUID; name: string };
    total_amount: number;
    outstanding_amount: number;
    status: InvoiceStatus;
}

export interface InvoiceDetail {
    invoice: InvoiceListItem;
    items: {
        sku_id: UUID;
        sku_name: string;
        qty: number;
        unit_price: number;
        line_total: number;
    }[];
    payments: {
        id: UUID;
        payment_date: string;
        amount: number;
        method: "CASH" | "UPI" | "BANK";
        reference: string | null;
    }[];
}
