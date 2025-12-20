import React, { useState, useMemo, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";

export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SearchableDropdownProps {
    options: DropdownOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    className?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    options,
    value,
    onValueChange,
    placeholder = "Select an option...",
    searchPlaceholder = "Search...",
    emptyMessage = "No options found.",
    disabled = false,
    className,
}) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value]);

    const filteredOptions = useMemo(() => {
        if (!searchValue) return options;

        const searchTerm = searchValue.toLowerCase();
        return options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm)
        );
    }, [options, searchValue]);

    const handleSelect = (currentValue: string) => {
        onValueChange?.(currentValue === value ? "" : currentValue);
        setOpen(false);
        setSearchValue("");
    };

    // Focus search input when dropdown opens
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "w-full justify-between border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
                        !selectedOption && "text-muted-foreground",
                        className
                    )}
                >
                    <span className="truncate text-gray-500">
                        {selectedOption?.label || placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full bg-white border-none p-0"
                align="start"
            >
                <Command shouldFilter={false}>
                    <div className="flex items-center border-b px-3">
                        <CommandInput
                            ref={inputRef}
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onValueChange={setSearchValue}
                            className="border-none focus:ring-0"
                        />
                    </div>
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {filteredOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={handleSelect}
                                    disabled={option.disabled}
                                    className="flex items-center justify-between cursor-pointer"
                                >
                                    <span className="truncate">
                                        {option.label}
                                    </span>
                                    <Check
                                        className={cn(
                                            "ml-2 h-4 w-4 flex-shrink-0",
                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SearchableDropdown;
