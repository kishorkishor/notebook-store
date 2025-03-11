"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilterIcon, Check, ArrowUpDown } from "lucide-react"
import { useTheme } from "next-themes"

export type SortOption = {
  label: string
  value: string
}

const sortOptions: SortOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
]

interface FilterDropdownProps {
  onSortChange: (value: string) => void
  currentSort: string
}

export function FilterDropdown({ onSortChange, currentSort }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === 'dark'
  
  // Get the current sort option label
  const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label || "Newest"

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`flex items-center gap-2 
            ${isDarkTheme 
              ? 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border-slate-700'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200'
            } 
            transition-all duration-300 shadow-sm hover:shadow-md`}
        >
          <FilterIcon className={`h-4 w-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className="font-medium">Filter</span>
          <ArrowUpDown className={`h-3.5 w-3.5 ml-1 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'} transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`w-56 rounded-lg shadow-lg border p-1
          ${isDarkTheme 
            ? 'bg-slate-900 border-slate-700' 
            : 'bg-white border-blue-100'
          } animate-in fade-in-80 zoom-in-95`}
      >
        <DropdownMenuLabel className={`flex items-center gap-2 font-semibold px-3 py-2 ${isDarkTheme ? 'text-blue-400' : 'text-blue-700'}`}>
          <ArrowUpDown className="h-4 w-4" />
          <span>Sort Options</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={isDarkTheme ? 'bg-slate-700' : 'bg-blue-100'} />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`flex items-center justify-between cursor-pointer px-3 py-2 my-1 rounded-md transition-colors ${
              currentSort === option.value 
                ? isDarkTheme 
                  ? 'bg-slate-800 text-blue-400 font-medium' 
                  : 'bg-blue-50 text-blue-700 font-medium'
                : isDarkTheme
                  ? 'hover:bg-slate-800 hover:text-blue-400'
                  : 'hover:bg-blue-50 hover:text-blue-700'
            }`}
            onClick={() => {
              onSortChange(option.value)
              setIsOpen(false)
            }}
          >
            {option.label}
            {currentSort === option.value && (
              <Check className={`h-4 w-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'} animate-in slide-in-from-right-5`} />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
