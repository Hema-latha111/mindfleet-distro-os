interface Props {
    rows?: number;
    cols?: number;
    className?: string;
}

const SkeletonLoader = ({ rows = 5, cols = 4, className = '' }: Props) => (
    <div className={`space-y-3 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className={`grid gap-3 animate-pulse`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {Array.from({ length: cols }).map((_, j) => (
                    <div key={j} className="h-10 rounded-lg bg-gray-100" />
                ))}
            </div>
        ))}
    </div>
);

export const CardSkeleton = ({ count = 4 }: { count?: number }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100" />
                    <div className="h-5 w-16 rounded-full bg-gray-100" />
                </div>
                <div className="h-4 w-3/4 rounded bg-gray-100 mb-2" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
            </div>
        ))}
    </div>
);

export default SkeletonLoader;
