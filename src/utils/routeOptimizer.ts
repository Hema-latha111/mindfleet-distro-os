/**
 * ═══════════════════════════════════════════════════════════════════════
 *  GEO CLUSTERING + ROUTE OPTIMIZER
 *  Assigns shops to staff in tight geographic clusters,
 *  then optimizes the delivery order within each cluster
 *  using Nearest Neighbor TSP heuristic + 2-opt improvement.
 * ═══════════════════════════════════════════════════════════════════════
 */

import type { Shop, Staff } from '../store/types';

// ─── Types ───────────────────────────────────────────────────────────────
interface GeoPoint {
    lat: number;
    lng: number;
}

export interface ClusterAssignment {
    staffId: string;
    staffName: string;
    shopIds: string[];           // Ordered for optimal delivery
    shops: Shop[];               // Full shop objects in delivery order
    centroid: GeoPoint;          // Cluster center
    totalDistance: number;        // Total route distance (km)
    estimatedTime: number;       // Minutes
    stopCount: number;
}

export interface OptimizedPlan {
    assignments: ClusterAssignment[];
    totalDistance: number;
    avgStopsPerStaff: number;
    optimizationScore: number;   // 0-100
}

// ─── Geo Utilities ───────────────────────────────────────────────────────
const DEG_TO_KM_LAT = 111.32;    // 1° lat ≈ 111.32 km
const DEG_TO_KM_LNG = 85.0;      // 1° lng ≈ 85 km at ~13°N (Chennai)

function haversineDistance(a: GeoPoint, b: GeoPoint): number {
    const dLat = (b.lat - a.lat) * DEG_TO_KM_LAT;
    const dLng = (b.lng - a.lng) * DEG_TO_KM_LNG;
    return Math.sqrt(dLat * dLat + dLng * dLng);
}

function getCentroid(points: GeoPoint[]): GeoPoint {
    if (points.length === 0) return { lat: 0, lng: 0 };
    const sum = points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }), { lat: 0, lng: 0 });
    return { lat: sum.lat / points.length, lng: sum.lng / points.length };
}

function getShopGeo(shop: Shop): GeoPoint {
    return {
        lat: (shop as any).lat || shop.geo?.lat || 13.1,
        lng: (shop as any).lng || shop.geo?.lng || 80.21,
    };
}

// ─── K-Means Clustering ─────────────────────────────────────────────────
function kMeansCluster(shops: Shop[], k: number, maxIterations = 20): Shop[][] {
    if (shops.length === 0 || k <= 0) return [];
    if (k >= shops.length) return shops.map(s => [s]);

    const points = shops.map(s => getShopGeo(s));

    // Initialize centroids using K-Means++ for better initial placement
    const centroids: GeoPoint[] = [];
    // Pick first centroid randomly
    centroids.push({ ...points[0] });

    for (let c = 1; c < k; c++) {
        // Pick next centroid weighted by distance from nearest existing centroid
        const distances = points.map(p => {
            const minDist = Math.min(...centroids.map(cen => haversineDistance(p, cen)));
            return minDist * minDist; // Square for weighting
        });
        const totalDist = distances.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalDist;
        let idx = 0;
        for (let i = 0; i < distances.length; i++) {
            random -= distances[i];
            if (random <= 0) { idx = i; break; }
        }
        centroids.push({ ...points[idx] });
    }

    // Iterate
    let assignments = new Array(shops.length).fill(0);

    for (let iter = 0; iter < maxIterations; iter++) {
        // Assign each shop to nearest centroid
        const newAssignments = points.map(p => {
            let minDist = Infinity;
            let bestCluster = 0;
            for (let c = 0; c < k; c++) {
                const d = haversineDistance(p, centroids[c]);
                if (d < minDist) { minDist = d; bestCluster = c; }
            }
            return bestCluster;
        });

        // Check convergence
        const changed = newAssignments.some((a, i) => a !== assignments[i]);
        assignments = newAssignments;

        if (!changed) break;

        // Recalculate centroids
        for (let c = 0; c < k; c++) {
            const clusterPoints = points.filter((_, i) => assignments[i] === c);
            if (clusterPoints.length > 0) {
                centroids[c] = getCentroid(clusterPoints);
            }
        }
    }

    // Build cluster arrays
    const clusters: Shop[][] = Array.from({ length: k }, () => []);
    shops.forEach((shop, i) => {
        clusters[assignments[i]].push(shop);
    });

    // Remove empty clusters and rebalance
    return clusters.filter(c => c.length > 0);
}

// ─── Balance Clusters (ensure no cluster is too big/small) ───────────────
function balanceClusters(clusters: Shop[][], maxPerCluster: number): Shop[][] {
    const balanced = [...clusters.map(c => [...c])];

    // Move shops from oversized clusters to nearest undersized ones
    for (let i = 0; i < balanced.length; i++) {
        while (balanced[i].length > maxPerCluster) {
            const overflow = balanced[i].pop()!;
            const overflowGeo = getShopGeo(overflow);

            // Find nearest cluster that has room
            let bestCluster = -1;
            let bestDist = Infinity;
            for (let j = 0; j < balanced.length; j++) {
                if (j === i || balanced[j].length >= maxPerCluster) continue;
                const centroid = getCentroid(balanced[j].map(s => getShopGeo(s)));
                const dist = haversineDistance(overflowGeo, centroid);
                if (dist < bestDist) { bestDist = dist; bestCluster = j; }
            }

            if (bestCluster >= 0) {
                balanced[bestCluster].push(overflow);
            } else {
                balanced[i].push(overflow); // Can't move, put it back
                break;
            }
        }
    }

    return balanced;
}

// ─── Nearest Neighbor TSP ────────────────────────────────────────────────
function nearestNeighborTSP(shops: Shop[], startPoint?: GeoPoint): Shop[] {
    if (shops.length <= 1) return [...shops];

    const remaining = [...shops];
    const ordered: Shop[] = [];

    // Start from nearest shop to startPoint (or centroid)
    const start = startPoint || getCentroid(shops.map(s => getShopGeo(s)));
    let current = start;

    while (remaining.length > 0) {
        let bestIdx = 0;
        let bestDist = Infinity;

        for (let i = 0; i < remaining.length; i++) {
            const d = haversineDistance(current, getShopGeo(remaining[i]));
            if (d < bestDist) { bestDist = d; bestIdx = i; }
        }

        const next = remaining.splice(bestIdx, 1)[0];
        ordered.push(next);
        current = getShopGeo(next);
    }

    return ordered;
}

// ─── 2-Opt Improvement ──────────────────────────────────────────────────
function twoOptImprove(shops: Shop[], maxIterations = 50): Shop[] {
    if (shops.length <= 3) return shops;

    const route = [...shops];
    let improved = true;
    let iterations = 0;

    while (improved && iterations < maxIterations) {
        improved = false;
        iterations++;

        for (let i = 0; i < route.length - 2; i++) {
            for (let j = i + 2; j < route.length; j++) {
                const a = getShopGeo(route[i]);
                const b = getShopGeo(route[i + 1]);
                const c = getShopGeo(route[j]);
                const d = j + 1 < route.length ? getShopGeo(route[j + 1]) : a;

                const currentDist = haversineDistance(a, b) + haversineDistance(c, d);
                const newDist = haversineDistance(a, c) + haversineDistance(b, d);

                if (newDist < currentDist - 0.001) {
                    // Reverse the segment between i+1 and j
                    const segment = route.slice(i + 1, j + 1).reverse();
                    route.splice(i + 1, segment.length, ...segment);
                    improved = true;
                }
            }
        }
    }

    return route;
}

// ─── Calculate total route distance ──────────────────────────────────────
function calculateRouteDistance(shops: Shop[]): number {
    let total = 0;
    for (let i = 0; i < shops.length - 1; i++) {
        total += haversineDistance(getShopGeo(shops[i]), getShopGeo(shops[i + 1]));
    }
    return total;
}

// ─── Main: Generate Optimized Clustered Plan ─────────────────────────────
export function generateOptimizedPlan(
    allShops: Shop[],
    activeStaff: Staff[],
): OptimizedPlan {
    const k = activeStaff.length;
    if (k === 0 || allShops.length === 0) {
        return { assignments: [], totalDistance: 0, avgStopsPerStaff: 0, optimizationScore: 0 };
    }

    // Filter shops with geo data
    const shopsWithGeo = allShops.filter(s =>
        ((s as any).lat && (s as any).lng) || (s.geo?.lat && s.geo?.lng)
    );

    const maxPerStaff = Math.ceil(shopsWithGeo.length / k) + 3; // Small buffer

    // Step 1: K-Means clustering
    let clusters = kMeansCluster(shopsWithGeo, k);

    // Step 2: Balance clusters
    clusters = balanceClusters(clusters, maxPerStaff);

    // Step 3: For each cluster, optimize route order
    const assignments: ClusterAssignment[] = clusters.map((clusterShops, i) => {
        const staff = activeStaff[i] || activeStaff[activeStaff.length - 1];
        const centroid = getCentroid(clusterShops.map(s => getShopGeo(s)));

        // Nearest neighbor + 2-opt for optimal route
        let optimized = nearestNeighborTSP(clusterShops, centroid);
        optimized = twoOptImprove(optimized);

        const totalDistance = calculateRouteDistance(optimized);
        const avgSpeedKmh = 15; // Urban delivery speed
        const stopTimeMin = 5;  // 5 min per stop
        const estimatedTime = (totalDistance / avgSpeedKmh) * 60 + optimized.length * stopTimeMin;

        return {
            staffId: staff.id,
            staffName: staff.name,
            shopIds: optimized.map(s => s.id),
            shops: optimized,
            centroid,
            totalDistance: Math.round(totalDistance * 100) / 100,
            estimatedTime: Math.round(estimatedTime),
            stopCount: optimized.length,
        };
    });

    // Sort assignments by cluster size (largest first)
    assignments.sort((a, b) => b.stopCount - a.stopCount);

    // Reassign staff to clusters (assign most experienced staff to largest clusters)
    assignments.forEach((a, i) => {
        if (activeStaff[i]) {
            a.staffId = activeStaff[i].id;
            a.staffName = activeStaff[i].name;
        }
    });

    const totalDistance = assignments.reduce((sum, a) => sum + a.totalDistance, 0);
    const avgStops = Math.round(shopsWithGeo.length / assignments.length);

    // Calculate optimization score (how well balanced and compact)
    const stopCounts = assignments.map(a => a.stopCount);
    const stopStdDev = Math.sqrt(stopCounts.reduce((sum, c) => sum + (c - avgStops) ** 2, 0) / stopCounts.length);
    const balanceScore = Math.max(0, 100 - stopStdDev * 10); // Penalty for imbalance
    const compactScore = Math.max(0, 100 - (totalDistance / shopsWithGeo.length) * 50); // Penalty for spread
    const optimizationScore = Math.round((balanceScore * 0.4 + compactScore * 0.6));

    return {
        assignments,
        totalDistance: Math.round(totalDistance * 100) / 100,
        avgStopsPerStaff: avgStops,
        optimizationScore: Math.min(100, Math.max(50, optimizationScore)),
    };
}

// ─── Get a single staff member's optimized route ─────────────────────────
export function getStaffOptimizedRoute(
    allShops: Shop[],
    activeStaff: Staff[],
    staffId: string,
): ClusterAssignment | null {
    const plan = generateOptimizedPlan(allShops, activeStaff);
    return plan.assignments.find(a => a.staffId === staffId) || null;
}

// ─── Color per cluster (for map visualization) ──────────────────────────
export const CLUSTER_COLORS = [
    '#4285f4', // Blue
    '#ea4335', // Red
    '#34a853', // Green
    '#fbbc05', // Yellow
    '#9c27b0', // Purple
    '#00acc1', // Cyan
    '#ff7043', // Deep Orange
    '#7cb342', // Light Green
    '#5c6bc0', // Indigo
    '#f06292', // Pink
    '#26a69a', // Teal
    '#8d6e63', // Brown
    '#78909c', // Blue Grey
    '#ab47bc', // Purple Light
    '#29b6f6', // Light Blue
];
