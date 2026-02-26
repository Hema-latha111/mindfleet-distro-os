// ─── Global Envelopes (Section 1.1) ───────────────────────────────────────────────
export interface ApiResponse<T> {
  request_id: string;
  data: T;
}

export interface ApiError {
  request_id: string;
  error: {
    code: ApiErrorCode;
    message: string;
    details?: {
      field_errors?: { field: string; issue: string }[];
      hint?: string;
    };
  };
}

export type ApiErrorCode =
  | 'AUTH_REQUIRED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'LLM_PROVIDER_ERROR';

// ─── Lifecycles (Section 8) ───────────────────────────────────────────────────
export type DraftStatus = 'DRAFT' | 'APPROVED' | 'REJECTED' | 'EXECUTED' | 'FAILED';
export type DispatchPlanStatus = 'NONE' | 'DRAFT' | 'PLANNED' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type DraftType =
  | 'DISPATCH_PLAN'
  | 'SHOP_IMPORT'
  | 'INVOICE_GENERATION'
  | 'INVENTORY_UPDATE'
  | 'OVERRIDE_PLAN'
  | 'INVENTORY_ADJUSTMENT'
  | 'SHOP_UPDATE'
  | 'STAFF_UPDATE'
  | 'INVOICE_UPDATE'
  | 'SHOP_REASSIGN'
  | 'ROUTE_REORDER'
  | 'STOP_SKIP'
  | 'REBALANCE'
  | 'CADENCE_CHANGE'
  | 'ADD_STAFF';

export interface DraftCard {
  id: string;
  type: DraftType;
  title: string;
  description: string; // Keep for backward compat
  summary: string[];   // Spec 2.4
  confidence: number; // 70–98
  status: DraftStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  reasonTag?: string;
  payload: Record<string, unknown>;
  explanation?: string;
  reasoning?: string[];
  risks: { level: 'INFO' | 'WARN' | 'CRITICAL'; text: string }[]; // Spec 2.4
  confidenceBreakdown?: {
    dataQuality: number;
    historicalReliability: number;
    inventoryRisk: number;
  };
  shortages?: { skuName: string; missing: number }[];
  diff?: { before: unknown; after: unknown };
}

// ─── User / Role (Section 1.2) ────────────────────────────────────────────────
export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email?: string;
}

export interface CurrentUserContext {
  user: {
    user_id: string;
    full_name: string;
    email: string;
  };
  membership: {
    tenant_id: string;
    tenant_name: string;
    role: UserRole;
    staff_id: string | null;
  };
}

// ─── Staff ────────────────────────────────────────────────────────────────────
export interface Staff {
  id: string;
  name: string;
  phone: string;
  capacity: number;
  stops: number;
  distance: string;
  performance: number;
  risk: boolean;
  status: 'Active' | 'On Leave' | 'Inactive';
}

// ─── Shop (Section 1.4) ───────────────────────────────────────────────────────
export type GeoPrecision = 'ROOFTOP' | 'APPROX' | 'UNKNOWN';
export type DeliveryCadence = 'DAILY' | 'ALT_DAYS' | 'WEEKLY' | 'CUSTOM';
export type PriorityLevel = 'NORMAL' | 'HIGH' | 'CRITICAL';

export interface GeoLocation {
  lat: number;
  lng: number;
  precision?: GeoPrecision;
}

export interface DeliveryConfig {
  cadence: DeliveryCadence;
  delivery_days: Record<string, boolean>; // mon: true, etc.
  priority: PriorityLevel;
  status: 'ACTIVE' | 'INACTIVE';
  last_delivery_at?: string;
}

export interface Shop {
  id: string;
  name: string;
  owner_name: string | null;
  phone: string | null;
  address: string | null;
  geo: GeoLocation; // Refactored from lat/lng fields
  delivery: DeliveryConfig; // Refactored from cadence/preferredDays
  data_quality_score: number;

  // Legacy fields mapped/computed for backward compat until full migration
  area: string; // Part of address usually
  zone: string;
  balance: number;
  creditLimit: number;

  // Flattened accessors for UI convenience (optional, depending on architecture)
  lat?: number;
  lng?: number;
  preferredDays?: string[];
  assignedStaffId?: string;
}

// ─── Inventory (Section 1.5) ──────────────────────────────────────────────────
export interface InventoryPricing {
  cost_price: number;
  sell_price: number;
}

export interface InventoryStock {
  available_qty: number;
  low_stock: boolean; // computed
}

export interface InventoryBatch {
  id: string;
  batch_code: string;
  qty_received: number;
  qty_available: number;
  received_at: string;
  expiry_at: string | null;
  unit_price: number; // Often per batch
  skuId?: string; // Relation
  skuName?: string;
  category?: string;
}

export interface InventoryMovement {
  id: string;
  movement_type: 'RECEIVE' | 'ALLOCATE' | 'DELIVER' | 'ADJUST' | 'RETURN';
  qty: number;
  ref: { entity_type: string; entity_id: string };
  created_at: string;
}

export interface InventorySKU {
  id: string;
  name: string;
  category: string;
  unit: string;
  active: boolean;
  pricing: InventoryPricing;
  stock: InventoryStock;
  batches: InventoryBatch[];
  velocity?: { avg_per_day_7d: number };

  // Legacy mappings
  available: number;
  threshold: number;
  avgDaily: number;
  lowStock: boolean;
}

// ─── Invoice (Section 1.9) ────────────────────────────────────────────────────
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PARTIAL' | 'PAID' | 'ISSUED' | 'VOID'; // Added ISSUED/VOID

export interface InvoiceItem {
  sku_id?: string;
  skuName: string;
  qty: number;
  unit_price: number;
  line_total: number; // total in legacy
  unit?: string;
}

export interface Invoice {
  id: string;
  invoice_date: string;
  shop: { id: string; name: string };
  total_amount: number;
  outstanding_amount: number;
  status: InvoiceStatus;

  // Detailed view
  items: InvoiceItem[];
  payments?: {
    id: string;
    payment_date: string;
    amount: number;
    method: 'CASH' | 'UPI' | 'BANK';
    reference: string | null
  }[];

  // Legacy mappings
  shopId: string;
  shopName: string;
  total: number; // total_amount
  paid: number; // total - outstanding
  outstanding: number; // outstanding_amount
  createdAt: string;
  dueDate: string;
}

// ─── Dispatch (Section 1.7) ───────────────────────────────────────────────────
export interface DispatchSummary {
  staff_count: number;
  eligible_shops_count: number;
  assigned_shops_count: number;
  line_items_count: number;
  shortage_count: number;
}

export interface ObjectiveConfig {
  distance: number;
  sla: number;
  balance: number;
}

export interface DispatchPlan {
  id: string;
  dispatch_date: string; // date
  status: DispatchPlanStatus;
  confidence_score: number;
  summary?: DispatchSummary;
  objective_config?: ObjectiveConfig;
  constraints_used?: Record<string, unknown>;
  inputs_hash?: string;

  assignments: DispatchAssignment[];
  overrideHistory: OverrideEvent[];

  // Legacy
  date: string;
  confidence: number;
  objectiveWeights: Record<string, number>;
  constraints: string[];
}

export interface DispatchAssignment {
  id?: string;
  staffId: string;
  staff_name?: string;
  capacity_stops?: number;
  metrics?: { stops_count: number; distance_est_km: number; sla_risk_score: number };
  shops?: any[]; // Legacy

  // New Specification
  stops: DispatchStop[];
  shopIds: string[]; // Maintaining for existing components that rely on just IDs
}

export interface DispatchStop {
  id: string; // dispatch_stop_id
  shop_id: string;
  shop_name: string;
  address: string | null;
  stop_order: number;
  status: 'PENDING' | 'ARRIVED' | 'DELIVERED' | 'FAILED' | 'SKIPPED';
  sla_risk: 'LOW' | 'MED' | 'HIGH';
  qty_summary: string;
  items?: { sku_id: string; sku_name: string; qty: number; unit: string }[];
  notes?: string | null;
}

export interface OverrideEvent {
  id: string;
  timestamp: string;
  action: string;
  reason: string; /** CAPACITY|PRIORITY|SHOP_REQUEST|STAFF_ISSUE|OTHER */
  performedBy: string; // Actor { user_id, name } serialized or ID
  before: unknown;
  after: unknown;
  note?: string;
}

// ─── Chat Message ─────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'ai'; // 'assistant' per spec 1.3
  content: string;
  created_at: string; // timestamp
  draftId?: string;

  // Legacy
  timestamp: string;
}

// ─── System Settings ──────────────────────────────────────────────────────────
export type LLMProvider = 'GPT' | 'CLAUDE' | 'AUTO';
export type Language = 'en' | 'ta' | 'hi';

export interface SystemSettings {
  llmProvider: LLMProvider;
  autopilotLevel: number;
  optimizationWeights: {
    distance: number;
    sla: number;
    workload: number;
    credit: number;
  };
  temperature: number;
  language: Language;
}
