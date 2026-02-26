import { useRef, useState, useEffect, ReactNode } from 'react';

interface Props<T> {
    items: T[];
    height: number;
    rowHeight: number;
    renderRow: (item: T, index: number) => ReactNode;
    header?: ReactNode;
}

export function VirtualizedTable<T>({ items, height, rowHeight, renderRow, header }: Props<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setScrollTop(scrollRef.current.scrollTop);
            }
        };
        const node = scrollRef.current;
        if (node) {
            node.addEventListener('scroll', handleScroll);
            return () => node.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const totalHeight = items.length * rowHeight;
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = Math.min(
        items.length - 1,
        Math.floor((scrollTop + height) / rowHeight)
    );

    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
        visibleItems.push(
            <div
                key={i}
                style={{
                    position: 'absolute',
                    top: i * rowHeight,
                    left: 0,
                    right: 0,
                    height: rowHeight,
                }}
            >
                {renderRow(items[i], i)}
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm">
            {header && <div className="z-10 bg-gray-50/50 border-b border-gray-100">{header}</div>}
            <div
                ref={scrollRef}
                style={{ height, overflowY: 'auto', position: 'relative' }}
                className="scrollbar-thin scrollbar-thumb-purple-100 hover:scrollbar-thumb-purple-200 transition-colors"
            >
                <div style={{ height: totalHeight, position: 'relative' }}>
                    {visibleItems}
                </div>
            </div>
        </div>
    );
}
