"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const statusOptions = ["Draft", "Pending", "Paid"];

export default function StatusFilter() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleStatus = (status) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 font-bold text-lg">
          Filter{" "}
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-60 rounded-xl p-4 space-y-3 shadow-lg">
        {statusOptions.map((status) => (
          <label
            key={status}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(status)}
              onCheckedChange={() => toggleStatus(status)}
            />
            <span
              className={`font-semibold ${
                selected.includes(status)
                  ? "text-[#5F32DD]"
                  : "text-[#333] opacity-60"
              }`}
            >
              {status}
            </span>
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
}
