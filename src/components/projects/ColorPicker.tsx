import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Palette } from "lucide-react";

const defaultColors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#6366F1",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#EF4444",
    "#14B8A6",
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#000000",
    "#4B5563",
    "#6B7280",
    "#9CA3AF",
    "#D1D5DB",
];

const ColorPicker = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (color: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                    </Label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm flex items-center justify-center transition-all hover:shadow-md"
                            style={{ backgroundColor: value }}
                        >
                            <Palette
                                size={20}
                                className="text-white mix-blend-difference"
                            />
                        </button>

                        <div className="flex-1">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                                placeholder="#000000"
                            />
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-0">
                <div className="mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 min-w-64">
                    <div className="space-y-4">
                        {/* Custom color input */}
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-12 h-12 rounded border cursor-pointer"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>

                        {/* Color presets */}
                        <div>
                            <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                                Color Presets
                            </h4>
                            <div className="grid grid-cols-5 gap-2">
                                {defaultColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => {
                                            onChange(color);
                                            setOpen(false);
                                        }}
                                        className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                                            value === color
                                                ? "border-gray-900 ring-2 ring-offset-1 ring-gray-300"
                                                : "border-gray-300"
                                        }`}
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ColorPicker;
