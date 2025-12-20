"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

export function CalendarPicker({
    date,
    onSelectDate,
}: {
    date: Date | undefined;
    onSelectDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col flex-1 gap-3">
            <Label htmlFor="date" className="px-1">
                Due Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    asChild
                    className="w-full border-1 py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                    <Button
                        variant="outline"
                        id="date"
                        className=" justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="bg-white border-0 w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onSelectDate(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
