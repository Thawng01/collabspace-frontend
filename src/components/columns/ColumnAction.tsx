import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreVertical } from "lucide-react";
import { NewColumn } from "./NewColumn";
import type { Column } from "../../types";
import { ColumnDelete } from "./ColumnDelete";

const ColumnAction = ({ column }: { column: Column }) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={20} className="text-gray-400" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="bg-white border-0 w-auto">
                <NewColumn projectId={column.id} column={column} />
                <ColumnDelete id={column.id} onOpen={setOpen} />
            </PopoverContent>
        </Popover>
    );
};

export default ColumnAction;
