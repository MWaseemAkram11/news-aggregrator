import { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Filter, RefreshCw } from 'lucide-react';
import { cn } from "../../lib/utils";
import { SOURCES, CATEGORIES } from "../../data/mock-data";
import { LoadingDots } from "../ui/loader";

interface SidebarProps {
  selectedSources: string[];
  selectedCategories: string[];
  onSourceChange: (sources: string[]) => void;
  onCategoryChange: (categories: string[]) => void;
  onDateChange: (fromDate: string, toDate: string) => void;
  isSearching: boolean;
}

export default function Sidebar({
  selectedSources,
  selectedCategories,
  onSourceChange,
  onCategoryChange,
  onDateChange,
  isSearching,
}: SidebarProps) {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<number>(0);

  const handleSourceToggle = (source: string) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];
    onSourceChange(updatedSources);
    updateActiveFiltersCount(updatedSources.length, selectedCategories.length, !!fromDate || !!toDate);
  };

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updatedCategories);
    updateActiveFiltersCount(selectedSources.length, updatedCategories.length, !!fromDate || !!toDate);
  };

  const updateActiveFiltersCount = (sourcesCount: number, categoriesCount: number, hasDateFilter: boolean) => {
    let count = 0;
    if (sourcesCount > 0) count++;
    if (categoriesCount > 0) count++;
    if (hasDateFilter) count++;
    setActiveFilters(count);
  };

  const applyDateFilter = () => {
    onDateChange(
      fromDate ? format(fromDate, "yyyy-MM-dd") : "",
      toDate ? format(toDate, "yyyy-MM-dd") : ""
    );
    updateActiveFiltersCount(selectedSources.length, selectedCategories.length, !!fromDate || !!toDate);
  };

  const resetDateFilter = () => {
    setFromDate(undefined);
    setToDate(undefined);
    onDateChange("", "");
    updateActiveFiltersCount(selectedSources.length, selectedCategories.length, false);
  };

  const resetAllFilters = () => {
    setFromDate(undefined);
    setToDate(undefined);
    onSourceChange([]);
    onCategoryChange([]);
    onDateChange("", "");
    setActiveFilters(0);
  };

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6 md:border-r border-gray-200 pr-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-lg">Filters</h3>
            {activeFilters > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-secondary text-white">
                {activeFilters}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your news feed
          </p>
        </div>
        
        {activeFilters > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetAllFilters}
            className="text-xs flex items-center space-x-1 text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {isSearching && (
        <div className="py-4 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <LoadingDots />
            <span>Updating results</span>
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["sources", "categories", "date"]} className="transition-all">
        <AccordionItem value="sources" className="border-b border-gray-200">
          <AccordionTrigger className="hover:bg-gray-50 px-2 rounded-md transition-colors">
            News Sources
            {selectedSources.length > 0 && (
              <span className="ml-2 text-xs font-medium text-primary">
                ({selectedSources.length})
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {SOURCES.map((source) => (
                <div key={source.id} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={`source-${source.id}`}
                    checked={selectedSources.includes(source.id)}
                    onCheckedChange={() => handleSourceToggle(source.id)}
                    className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <Label
                    htmlFor={`source-${source.id}`}
                    className="text-sm font-normal cursor-pointer group-hover:text-primary transition-colors"
                  >
                    {source.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories" className="border-b border-gray-200">
          <AccordionTrigger className="hover:bg-gray-50 px-2 rounded-md transition-colors">
            Categories
            {selectedCategories.length > 0 && (
              <span className="ml-2 text-xs font-medium text-primary">
                ({selectedCategories.length})
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                    className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer group-hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date" className="border-b border-gray-200">
          <AccordionTrigger className="hover:bg-gray-50 px-2 rounded-md transition-colors">
            Date Range
            {(fromDate || toDate) && (
              <span className="ml-2 text-xs font-medium text-primary">
                (Active)
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="from-date">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="from-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground",
                        fromDate && "border-primary/50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="rounded-md border bg-white border-gray-200 "
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-date">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="to-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground",
                        toDate && "border-primary/50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="rounded-md bg-white border border-gray-200"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={applyDateFilter} 
                  className="flex-1 button-primary"
                >
                  Apply
                </Button>
                <Button
                  onClick={resetDateFilter}
                  variant="outline"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}