# Component Specification v1.0 - MindFleet Distributor OS

## 1. Design & Architecture
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS with custom `mindfleet-theme` (purple/gray palette).
- **State Management**: Zustand (modular stores: `useDispatchStore`, `useDraftStore`, `useInventoryStore`, etc.).
- **Icons**: Lucide React.

## 2. Core Components

### 2.1 Command Center (`src/components/command-center`)
| Component | Description | Status |
|-----------|-------------|--------|
| `ChatThread` | Displays AI conversation history and Draft Cards. Supports typing indicators. | ✅ Implemented |
| `ChatInput` | User input area with quick action chips and file attachment. | ✅ Implemented |
| `ContextPanel` | Tabbed sidebar showing operational metrics (active dispatch, warnings, recent actions). | ✅ Implemented |

### 2.2 Dispatch Suite (`src/components/dispatch`)
| Component | Description | Status |
|-----------|-------------|--------|
| `DispatchPlanPanel` | Left panel in Dispatch screen showing draft plan details, summary stats, and approval actions. | ✅ Implemented |
| `AssignmentBoard` | Kanban-style board for Staff Assignments. Supports drag-and-drop stop reordering (mocked). | ✅ Implemented |
| `DiffViewer` | Visual comparison tool for Before/After plan changes. Supports Inline/Side-by-Side modes. | ✅ Implemented |
| `RouteMap` | Interactive map interface for route visualization (Mocked integration). | ✅ Partial (Mock) |
| `StopDrawer` | Slide-up drawer for detailed stop information and actions (Skip, Reassign). | ✅ Implemented |

### 2.3 Shared UI (`src/components/shared`)
| Component | Description | Status |
|-----------|-------------|--------|
| `DraftCard` | Standard card for AI proposals (Dispatch Plans, Adjustments). Displays risks and summaries. | ✅ Updated |
| `ReasonTagModal` | Modal for capturing structured reasons for manual overrides (enum based). | ✅ Implemented |
| `StatusBadge` | Unified status indicator for all entities (Drafts, Plans, Invoices, Stops). | ✅ Updated |
| `RiskBanner` | Alert banner for critical operational risks. | ✅ Implemented |
| `VirtualizedTable` | Performance-optimized table for large datasets (e.g. Inventory Batch Ledger). | ✅ Implemented |

## 3. Screen Implementations

### 3.1 Dispatch Operations (`/dispatch`)
- **Layout**: Tabbed interface (Plan, Assignments, Map).
- **Features**:
  - Viewing and approving AI-generated Dispatch Plans.
  - Manual Drag-and-Drop monitoring of Staff workloads.
  - Shop and Stop reassignment with reason capture.
  - Integration with `DecisionJournal` (mocked).

### 3.2 Inventory Control (`/inventory`)
- **Layout**: Grid/List toggle view.
- **Features**:
  - SKU monitoring with visual stock level indicators.
  - Virtualized List view for performance.
  - FIFO Batch Ledger visualization.
  - Manual Stock Adjustments via Draft system.

### 3.3 Staff Mobile View (`/staff/stops`)
- **Layout**: Mobile-first responsive design.
- **Features**:
  - Daily "My Route" dashboard.
  - List/Map toggle for stops.
  - `StopCard` with status management (Pending -> Arrived -> Delivered/Failed).
  - Failure reporting with required reason capture.

## 4. Data Models (Key Interfaces)
- **DraftCard**: `id`, `type`, `summary[]`, `risks[]`, `payload`.
- **DispatchPlan**: `assignments[]` (Staff -> ShopIds), `status`.
- **StopDetail**: `status`, `sla_risk`, `eta`.

## 5. Next Steps / TODOs
- [ ] Connect `RouteMap` to real Google Maps/Mapbox API.
- [ ] Implement actual Drag-and-Drop logic in `AssignmentBoard` (currently UI only).
- [ ] Wire up "View Full Diff" to a specialized modal/view.
- [ ] Backend integration for all Stores.
