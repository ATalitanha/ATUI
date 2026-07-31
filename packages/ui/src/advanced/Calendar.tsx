import React, { useState } from "react";
import { cn } from "@aurora-ui/utils";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@aurora-ui/icons";
import { Button } from "../primitives/Button/Button";
import { Popover } from "../overlays/Overlays";

// Helpers to work with Date without complex weight dependencies
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

// ============================================================================
// --- CALENDAR COMPONENT ---
// ============================================================================
export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (start?: Date, end?: Date) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  rangeStart,
  rangeEnd,
  onRangeChange,
  className,
}) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    onChange?.(selectedDate);

    if (onRangeChange) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        onRangeChange(selectedDate, undefined);
      } else if (rangeStart && !rangeEnd) {
        if (selectedDate < rangeStart) {
          onRangeChange(selectedDate, undefined);
        } else {
          onRangeChange(rangeStart, selectedDate);
        }
      }
    }
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === month &&
      value.getFullYear() === year
    );
  };

  const isInRange = (day: number) => {
    if (!rangeStart || !rangeEnd) return false;
    const current = new Date(year, month, day);
    return current >= rangeStart && current <= rangeEnd;
  };

  const isRangeBound = (day: number) => {
    if (!rangeStart) return false;
    const isStart =
      rangeStart.getDate() === day &&
      rangeStart.getMonth() === month &&
      rangeStart.getFullYear() === year;

    const isEnd =
      rangeEnd &&
      rangeEnd.getDate() === day &&
      rangeEnd.getMonth() === month &&
      rangeEnd.getFullYear() === year;

    return isStart || isEnd;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={cn("p-4 border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] bg-[var(--aurora-bg-surface)] w-[300px]", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-[var(--aurora-fg-base)]">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handlePrevMonth}>
            <ChevronLeftIcon size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleNextMonth}>
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="font-semibold text-[var(--aurora-fg-subtle)] py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {blanksArray.map((i) => (
          <span key={`blank-${i}`} />
        ))}
        {daysArray.map((day) => {
          const selected = isSelected(day);
          const activeRange = isInRange(day);
          const rangeBound = isRangeBound(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDateClick(day)}
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center font-medium transition-all text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--aurora-primary)]",
                selected && "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] hover:bg-[var(--aurora-primary)]",
                activeRange && "bg-[var(--aurora-primary-subtle)] text-[var(--aurora-fg-primary)] rounded-none",
                rangeBound && "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)]"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// --- DATE RANGE PICKER ---
// ============================================================================
export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: (start?: Date, end?: Date) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  className,
}) => {
  const [start, setStart] = useState<Date | undefined>(startDate);
  const [end, setEnd] = useState<Date | undefined>(endDate);

  const handleRangeChange = (newStart?: Date, newEnd?: Date) => {
    setStart(newStart);
    setEnd(newEnd);
    onChange?.(newStart, newEnd);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "--/--/----";
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const displayString = start
    ? `${formatDate(start)} - ${formatDate(end)}`
    : "Select date range...";

  return (
    <Popover
      className="w-[320px] p-0 border-0"
      trigger={
        <div className={cn("flex items-center gap-2.5 h-10 px-3 py-2 rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] text-sm text-[var(--aurora-fg-base)] cursor-pointer select-none", className)}>
          <CalendarIcon size={16} className="text-[var(--aurora-fg-muted)]" />
          <span>{displayString}</span>
        </div>
      }
    >
      <Calendar
        rangeStart={start}
        rangeEnd={end}
        onRangeChange={handleRangeChange}
        className="border-0 shadow-none bg-transparent"
      />
    </Popover>
  );
};