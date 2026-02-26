import type {
    Staff, Shop, InventorySKU, InventoryBatch, Invoice, InvoiceItem,
    DispatchPlan, DraftCard, ChatMessage, User
} from '../store/types';
import { SHOPS_LIST } from './shops_data';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[] | readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const uid = () => Math.random().toString(36).slice(2, 10);
const dateStr = (daysAgo: number) => {
    const d = new Date(2025, 1, 17);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
};
const futureDate = (daysAhead: number) => {
    const d = new Date(2025, 1, 17);
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
};

// ─── Users ────────────────────────────────────────────────────────────────────
export const USERS: User[] = [
    { id: 'u1', name: 'Arjun Sharma', role: 'ADMIN' },
    { id: 'u3', name: 'Ravi Kumar', role: 'STAFF' },
];

// ─── Staff (15) ───────────────────────────────────────────────────────────────
const staffNames = [
    'Ravi Kumar', 'Suresh Babu', 'Venkat Reddy', 'Ganesh M.', 'Prakash S.',
    'Arun D.', 'Karthik V.', 'Manoj P.', 'Srinivas R.', 'Deepak K.',
    'Rajesh N.', 'Vijay S.', 'Anand T.', 'Balu K.', 'Senthil P.'
];
const phones = () => `+91 ${rand(70000, 99999)}${rand(10000, 99999)}`;

export const STAFF_LIST: Staff[] = staffNames.map((name, i) => ({
    id: `s${i + 1}`,
    name,
    phone: phones(),
    capacity: rand(35, 50),
    stops: rand(25, 48),
    distance: `${rand(18, 38)} km`,
    performance: rand(78, 98),
    risk: i === 3 || i === 6 || i === 11,
    status: i === 13 ? 'On Leave' : i === 14 ? 'Inactive' : 'Active',
}));

// ─── Shops ────────────────────────────────────────────────────────────────────
export { SHOPS_LIST };

// ─── Inventory SKUs + Batches (300 batches) ───────────────────────────────────
const skuDefs = [
    { name: 'Milk 500ml', category: 'Dairy', avgDaily: 85, threshold: 200, unitPrice: 25 },
    { name: 'Milk 1L', category: 'Dairy', avgDaily: 60, threshold: 150, unitPrice: 48 },
    { name: 'Aavin Curd 200g', category: 'Dairy', avgDaily: 62, threshold: 150, unitPrice: 22 },
    { name: 'Aavin Curd 500g', category: 'Dairy', avgDaily: 40, threshold: 100, unitPrice: 50 },
    { name: 'Butter 100g', category: 'Dairy', avgDaily: 30, threshold: 80, unitPrice: 55 },
    { name: 'Paneer 200g', category: 'Dairy', avgDaily: 25, threshold: 60, unitPrice: 90 },
    { name: 'Ghee 500ml', category: 'Dairy', avgDaily: 20, threshold: 50, unitPrice: 320 },
    { name: 'Lassi 200ml', category: 'Dairy', avgDaily: 45, threshold: 100, unitPrice: 18 },
    { name: 'Flavoured Milk 200ml', category: 'Dairy', avgDaily: 55, threshold: 120, unitPrice: 20 },
    { name: 'Cheese Slice 200g', category: 'Dairy', avgDaily: 15, threshold: 40, unitPrice: 120 },
    { name: 'Bread White 400g', category: 'Bakery', avgDaily: 45, threshold: 100, unitPrice: 35 },
    { name: 'Bread Brown 400g', category: 'Bakery', avgDaily: 20, threshold: 50, unitPrice: 42 },
    { name: 'Rice 5kg', category: 'Staples', avgDaily: 38, threshold: 100, unitPrice: 280 },
    { name: 'Toor Dal 1kg', category: 'Staples', avgDaily: 25, threshold: 80, unitPrice: 140 },
    { name: 'Sugar 1kg', category: 'Staples', avgDaily: 42, threshold: 100, unitPrice: 45 },
    { name: 'Oil Sunflower 1L', category: 'Staples', avgDaily: 30, threshold: 80, unitPrice: 145 },
    { name: 'Tea Powder 250g', category: 'Beverages', avgDaily: 35, threshold: 80, unitPrice: 85 },
    { name: 'Coffee Powder 100g', category: 'Beverages', avgDaily: 18, threshold: 50, unitPrice: 95 },
    { name: 'Biscuit Variety Pack', category: 'Snacks', avgDaily: 55, threshold: 120, unitPrice: 30 },
    { name: 'Soap Bar', category: 'FMCG', avgDaily: 40, threshold: 100, unitPrice: 35 },
];

let batchCounter = 1;

export const INVENTORY_SKUS: InventorySKU[] = skuDefs.map((sku, i) => {
    const batchCount = rand(10, 20); // ~300 total across 20 SKUs
    const batches: InventoryBatch[] = Array.from({ length: batchCount }, (_, j) => {
        const qty = rand(20, 120);
        return {
            id: `batch${batchCounter++}`,
            skuId: `sku${i + 1}`,
            skuName: sku.name,
            batchId: `B-${String(batchCounter).padStart(3, '0')}`, // Legacy
            batch_code: `B-${String(batchCounter).padStart(3, '0')}`,
            receivedDate: dateStr(rand(1, 30)), // Legacy
            received_at: dateStr(rand(1, 30)),
            expiryDate: futureDate(rand(3, 60)), // Legacy
            expiry_at: futureDate(rand(3, 60)),
            quantity: qty, // Legacy
            qty_received: qty,
            qty_available: qty,
            unitPrice: sku.unitPrice, // Legacy
            unit_price: sku.unitPrice,
            category: sku.category,
        };
    });
    const available = batches.reduce((s, b) => s + b.qty_available, 0);
    return {
        id: `sku${i + 1}`,
        name: sku.name,
        category: sku.category,
        unit: 'unit',
        active: true,
        pricing: { cost_price: sku.unitPrice * 0.8, sell_price: sku.unitPrice },
        stock: { available_qty: available, low_stock: available < sku.threshold },
        batches,

        // Legacy
        available,
        threshold: sku.threshold,
        avgDaily: sku.avgDaily,
        lowStock: available < sku.threshold
    };
});

// ─── Invoices (200) ───────────────────────────────────────────────────────────
const invoiceStatuses = ['DRAFT', 'SENT', 'PARTIAL', 'PAID'] as const;

export const INVOICES_LIST: Invoice[] = Array.from({ length: 200 }, (_, i) => {
    const shop = SHOPS_LIST[i % SHOPS_LIST.length];
    const total = rand(2000, 50000);
    const statusIdx = rand(0, 3);
    const status = invoiceStatuses[statusIdx];
    const paid = status === 'PAID' ? total : status === 'PARTIAL' ? rand(500, total - 100) : 0;
    const items: InvoiceItem[] = Array.from({ length: rand(2, 6) }, () => {
        const sku = pick(INVENTORY_SKUS);
        const qty = rand(5, 50);
        const price = sku.batches[0]?.unit_price || 50;
        return {
            skuName: sku.name,
            qty,
            unitPrice: price, // Legacy
            unit_price: price,
            total: qty * price, // Legacy
            line_total: qty * price,
        };
    });
    return {
        id: `INV-${2400 + i + 1}`,
        shopId: shop.id, // Legacy
        shopName: shop.name, // Legacy
        shop: { id: shop.id, name: shop.name },
        invoice_date: dateStr(rand(0, 30)),
        total_amount: total,
        outstanding_amount: total - paid,
        total, // Legacy
        paid, // Legacy
        outstanding: total - paid, // Legacy
        status,
        createdAt: dateStr(rand(0, 30)),
        dueDate: futureDate(rand(0, 15)),
        items,
    };
});

// ─── Dispatch Plan (uses geo-clustering + TSP route optimization) ─────────────
import { generateOptimizedPlan } from '../utils/routeOptimizer';

const _activeStaff = STAFF_LIST.filter(s => s.status === 'Active');
const _optimizedPlan = generateOptimizedPlan(SHOPS_LIST, _activeStaff);

export const INITIAL_DISPATCH_PLAN: DispatchPlan = {
    id: 'dp1',
    date: '2025-02-17',
    dispatch_date: '2025-02-17',
    status: 'APPROVED',
    confidence: _optimizedPlan.optimizationScore,
    confidence_score: _optimizedPlan.optimizationScore,
    assignments: _optimizedPlan.assignments.map(a => ({
        staffId: a.staffId,
        shopIds: a.shopIds,   // Already in optimized delivery order
        stops: [],
    })),
    inputs_hash: 'sha256:a3f8c2d1e4b7f9a2c5d8e1f4a7b0c3d6',
    objectiveWeights: {
        distance: 0.35,
        workload: 0.30,
        sla: 0.25,
        creditRisk: 0.10,
    },
    constraints: [
        'Max 50 stops per staff',
        'SLA window: 6AM–2PM',
        'Avoid credit-blocked shops',
        'FIFO inventory dispatch',
        'Geo-clustered assignments',
        'TSP-optimized stop order',
    ],
    overrideHistory: [
        {
            id: 'ov1',
            timestamp: '2025-02-17T09:15:00',
            action: 'Shop Reassigned',
            reason: 'Proximity optimization',
            performedBy: 'Arjun Sharma',
            before: { shopId: 'shop4', staffId: 's1' },
            after: { shopId: 'shop4', staffId: 's2' },
        },
    ],
};

// ─── Initial Drafts ───────────────────────────────────────────────────────────
export const INITIAL_DRAFTS: DraftCard[] = [
    {
        id: 'draft1',
        type: 'DISPATCH_PLAN',
        title: 'genDispatchPlan',
        description: 'aiAnalyzeDispatch',
        summary: [
            '100 shops assigned to 13 staff members',
            'Estimated revenue: ₹4.8L',
            'Distance optimization: -18% vs manual',
            'SLA coverage: 100%'
        ],
        confidence: 91,
        status: 'APPROVED',
        createdAt: '2025-02-17T08:00:00',
        updatedAt: '2025-02-17T08:02:00',
        createdBy: 'AI',
        payload: { planId: 'dp1' },
        explanation: 'aiAnalyzeDispatch',
        risks: [
            { level: 'WARN', text: 'Karthik V. route exceeds 6h limit' },
            { level: 'INFO', text: '2 shops using approximated locations' }
        ]
    },
    {
        id: 'draft2',
        type: 'INVENTORY_ADJUSTMENT',
        title: 'Inventory Adjustment – Milk 500ml',
        description: 'aiAnalyzeInventory',
        summary: [
            'Increase Milk 500ml by 50 units',
            'Warehouse: WH-CHENNAI-1',
            'Priority: High'
        ],
        confidence: 85,
        status: 'DRAFT',
        createdAt: '2025-02-17T10:00:00',
        updatedAt: '2025-02-17T10:00:00',
        createdBy: 'Priya Menon',
        payload: { skuId: 'sku1', adjustment: 50 },
        explanation: 'aiAnalyzeInventory',
        risks: [
            { level: 'CRITICAL', text: 'Stockout imminent (4h)' }
        ]
    },
    {
        id: 'draft3',
        type: 'INVOICE_UPDATE',
        title: 'Invoice Batch – 62 Invoices',
        description: 'aiAnalyzeInvoice',
        summary: [
            '62 invoices to be generated',
            'Total value: ₹3.25L',
            'Eligible shops only'
        ],
        confidence: 98,
        status: 'DRAFT',
        createdAt: '2025-02-17T14:00:00',
        updatedAt: '2025-02-17T14:00:00',
        createdBy: 'AI',
        payload: { count: 62 },
        explanation: 'aiAnalyzeInvoice',
        risks: [
            { level: 'INFO', text: 'All shops verified for credit limits' }
        ]
    },
];

// ─── Initial Chat Messages ─────────────────────────────────────────────────────
export const INITIAL_CHAT: ChatMessage[] = [];


// ─── AI Response Generator ────────────────────────────────────────────────────
const aiResponses: Record<string, { content: string; draftType?: DraftCard['type'] }> = {
    dispatch: {
        content: 'aiAnalyzeDispatch',
        draftType: 'DISPATCH_PLAN',
    },
    inventory: {
        content: 'aiAnalyzeInventory',
        draftType: 'INVENTORY_ADJUSTMENT',
    },
    invoice: {
        content: 'aiAnalyzeInvoice',
        draftType: 'INVOICE_UPDATE',
    },
    risk: {
        content: 'aiAnalyzeRisk',
    },
    default: {
        content: 'aiAnalyzeDefault',
    },
};

export function generateAIResponse(userMessage: string): { content: string; draftType?: DraftCard['type'] } {
    const lower = userMessage.toLowerCase();

    // Dispatch / Plan / Route
    // Handles English + Tamil chip "விநியோகத்தைத் திட்டமிடு" and free-form inputs
    const isDispatch = lower.includes('dispatch') || lower.includes('plan') || lower.includes('route') ||
        lower.includes('விநியோக') || // covers "விநியோகம்", "விநியோகத்தை" etc.
        lower.includes('திட்ட') ||   // covers "திட்டம்", "திட்டமிடு" etc.
        lower.includes('வழி');
    if (isDispatch) return aiResponses.dispatch;

    // Inventory / Stock
    // Handles Tamil chip "சரக்குகளைப் புதுப்பி"
    const isInventory = lower.includes('inventory') || lower.includes('stock') ||
        lower.includes('பங்கு') ||
        lower.includes('சரக்கு'); // covers "சரக்குகளைப்" etc.
    if (isInventory) return aiResponses.inventory;

    // Invoice / Payment
    // Handles Tamil chip "விலைப்பட்டியலை உருவாக்கு"
    const isInvoice = lower.includes('invoice') || lower.includes('payment') ||
        lower.includes('விலைப்பட்டியல') || // covers "விலைப்பட்டியல்", "விலைப்பட்டியலை" etc.
        lower.includes('பணம்');
    if (isInvoice) return aiResponses.invoice;

    // Risk / Warning / Alert
    // Handles Tamil chip "அபாயங்களைக் காட்டு"
    const isRisk = lower.includes('risk') || lower.includes('warning') || lower.includes('alert') ||
        lower.includes('அபாய') ||      // covers "அபாயம்", "அபாயங்களைக்" etc.
        lower.includes('எச்சரிக்கை');
    if (isRisk) return aiResponses.risk;

    // Rebalance Routes
    // Handles Tamil chip "வழிகளை மறுசீரமைக்கவும்"
    const isRebalance = lower.includes('rebalance') || lower.includes('மறுசீரமை');
    if (isRebalance) return aiResponses.dispatch;

    // Onboarding
    if (lower.includes('add profile') || lower.includes('add person') || lower.includes('onboard')) {
        return {
            content: 'aiStaffProfileTemplate',
            draftType: 'ADD_STAFF'
        };
    }
    return aiResponses.default;
}

export function createDraftFromAI(type: DraftCard['type'], createdBy: string): DraftCard {
    const templates: Record<DraftCard['type'], Partial<DraftCard>> = {
        DISPATCH_PLAN: {
            title: 'draftPlan',
            description: 'dispatchDescription',
            summary: ['optimizedRoutes', 'workloadBalanced', 'slaPriority'],
            explanation: 'dispatchExplanation',
        },
        INVENTORY_ADJUSTMENT: {
            title: 'inventoryAdjustmentRequest',
            description: 'stockLevelAdjustment',
            summary: ['replenishSafetyStock', 'inventoryLedgerUpdate'],
            explanation: 'stockThresholdExplanation',
        },
        SHOP_IMPORT: {
            title: 'newShopOnboardingAi',
            description: 'shopImportAnalysis',
            summary: ['batchImportNewAccounts', 'gpsVerifiedShops', 'creditRiskAssessment'],
            explanation: 'shopImportExplanation',
        },
        INVOICE_GENERATION: {
            title: 'invoiceBatchGeneration',
            description: 'generateInvoicesDelivered',
            summary: ['bulkInvoiceRun', 'digitalSigningReady'],
            explanation: 'invoiceGenerationExplanation',
        },
        INVENTORY_UPDATE: {
            title: 'Inventory Update',
            description: 'Bulk update SKU attributes',
            summary: ['Price update', 'Category shift'],
            explanation: 'Updating price lists based on revised procurement costs.',
        },
        OVERRIDE_PLAN: {
            title: 'Override Dispatch Plan',
            description: 'Manual adjustment to active plan',
            summary: ['Human override tags', 'Rebalancing committed'],
            explanation: 'Adjusting assignments based on emergency staff unavailability.',
        },
        INVOICE_UPDATE: {
            title: 'invoiceBatchGeneration',
            description: 'generateInvoicesDelivered',
            summary: ['bulkInvoiceRun', 'digitalSigningReady'],
            explanation: 'invoiceGenerationExplanation',
        },
        SHOP_REASSIGN: {
            title: 'Shop Reassignment',
            description: 'Reassign shop to different staff member',
            summary: ['Proximity move', 'Balanced staff workload'],
            explanation: 'Proximity optimization triggered reassignment.',
        },
        ROUTE_REORDER: {
            title: 'Route Reorder',
            description: 'Reorder delivery stops for optimal routing',
            summary: ['Distance reduction', 'Reduced traffic wait-time'],
            explanation: 'Traffic and distance analysis suggests reordering.',
        },
        STOP_SKIP: {
            title: 'Stop Skip Request',
            description: 'Skip delivery stop for today',
            summary: ['Store closed override', 'Rescheduled for tomorrow'],
            explanation: 'Shop requested skip or is temporarily closed.',
        },
        REBALANCE: {
            title: 'Workload Rebalance',
            description: 'Rebalance shop assignments across staff',
            summary: ['Over-capacity mitigation', 'Staff fatigue reduction'],
            explanation: 'Detected uneven workload distribution. Rebalancing recommended.',
        },
        SHOP_UPDATE: {
            title: 'Shop Detail Update',
            description: 'Update shop metadata or location',
            summary: ['Data enrichment', 'GPS verification'],
            explanation: 'Manual or AI-triggered shop update.',
        },
        STAFF_UPDATE: {
            title: 'Staff Record Update',
            description: 'Update staff capacity or status',
            summary: ['Quota adjustment', 'Shift change'],
            explanation: 'Administrative update to staff record or roster.',
        },
        CADENCE_CHANGE: {
            title: 'Delivery Cadence Update',
            description: 'Update preferred delivery days for shop',
            summary: ['Route optimization impact', 'Customer preference update'],
            explanation: 'Adjusting delivery days based on customer request or route efficiency.',
        },
        ADD_STAFF: {
            title: 'newShopOnboarding',
            description: 'Manual addition of a delivery partner to the fleet',
            summary: ['Awaiting personal details', 'Onboarding phase verification'],
            explanation: 'aiStaffProfileTemplate',
        },
    };

    const template = templates[type];
    return {
        id: `draft_${uid()}`,
        type,
        title: template.title || 'New Draft',
        description: template.description || '',
        summary: template.summary || [],
        confidence: rand(70, 98),
        status: 'DRAFT',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy,
        payload: type === 'DISPATCH_PLAN' ? { staffCount: rand(10, 15), shopCount: rand(80, 150) } : {},
        explanation: template.explanation,
        reasoning: [
            "reasoningBacktracking",
            "reasoningPremiumShops",
            "reasoningVehicleCapacity"
        ],
        risks: [
            { level: 'WARN', text: "riskMissingGps" },
            { level: 'CRITICAL', text: "riskMilkStock" },
            { level: 'INFO', text: "riskHighStopRoute" }
        ],
        confidenceBreakdown: {
            dataQuality: rand(85, 95),
            historicalReliability: rand(75, 98),
            inventoryRisk: rand(80, 92)
        },
        shortages: type === 'DISPATCH_PLAN' ? [
            { skuName: "Milk 500ml", missing: 42 },
            { skuName: "Bread White", missing: 12 }
        ] : undefined
    };
}
