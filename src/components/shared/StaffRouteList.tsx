import { ChevronRight, MapPin, Package, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
    stops: any[];
}

const StaffRouteList = ({ stops }: Props) => {
    return (
        <div className="space-y-4">
            {stops.map((stop, i) => (
                <NavLink
                    key={stop.id}
                    to="/stops"
                    className="block group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:border-purple-200 transition-all active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gray-50 flex flex-col items-center justify-center shrink-0 group-hover:bg-purple-50 transition-colors">
                            <span className="text-xs font-black text-gray-400 group-hover:text-purple-600">#{i + 1}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate">{stop.name}</h3>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                    <MapPin className="h-2.5 w-2.5" /> {stop.area}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                    <Clock className="h-2.5 w-2.5" /> 10:30 AM
                                </span>
                            </div>
                        </div>

                        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-purple-400 transition-all" />
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span className="text-[10px] font-black text-gray-500 uppercase">12 SKUs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                            <span className="text-[10px] font-black text-gray-500 uppercase">Premium</span>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default StaffRouteList;
