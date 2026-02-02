"use client";

import * as React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MobileFilterBar() {
    return (
        <div className="lg:hidden sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 justify-center gap-2 border-gray-200">
                <SlidersHorizontal size={16} /> Filters
            </Button>
            <div className="relative flex-1">
                <Button variant="outline" size="sm" className="w-full justify-center gap-2 border-gray-200">
                    <ArrowUpDown size={16} /> Sort
                </Button>
            </div>
        </div>
    );
}
