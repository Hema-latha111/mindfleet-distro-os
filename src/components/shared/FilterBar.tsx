import { Search, X, Filter as FilterIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

interface Props {
    searchPlaceholder?: string;
    initialSearch?: string;
    onSearch: (term: string) => void;
    options: FilterOption[];
    activeFilter: string;
    onFilterChange: (id: string) => void;
    rightElement?: React.ReactNode;
}

const FilterBar = ({
    searchPlaceholder = "Search...",
    initialSearch = "",
    onSearch,
    options,
    activeFilter,
    onFilterChange,
    rightElement
}: Props) => {
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        onSearch(val);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-purple-100 bg-white px-4 py-2.5 transition-all focus-within:border-purple-400 focus-within:shadow-[0_8px_16px_-6px_rgba(147,51,234,0.1)] group">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
                {searchTerm && (
                    <button
                        onClick={() => handleSearch("")}
                        className="rounded-full p-1 hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>

            {/* Chips Area */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide shrink-0">
                <div className="flex h-10 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50/50 px-3 text-gray-400 shrink-0">
                    <FilterIcon className="h-4 w-4" />
                </div>
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onFilterChange(opt.id)}
                        className={`flex h-10 items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold transition-all shrink-0 ${activeFilter === opt.id
                            ? "border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-600/20"
                            : "border-gray-100 bg-white text-gray-500 hover:border-purple-200 hover:bg-purple-50"
                            }`}
                    >
                        {opt.label}
                        {opt.count !== undefined && (
                            <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-black ${activeFilter === opt.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                }`}>
                                {opt.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {rightElement && (
                <div className="flex items-center gap-2 shrink-0 md:ml-auto">
                    {rightElement}
                </div>
            )}
        </div>
    );
};

export default FilterBar;
