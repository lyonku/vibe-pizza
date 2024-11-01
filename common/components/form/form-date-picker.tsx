"use client";

import { cn } from "@/common/lib/utils";
import {
  Button,
  Calendar,
  ErrorText,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RequiredSymbol,
} from "@/common/ui";
import { CalendarIcon } from "lucide-react";
import { ButtonHTMLAttributes, FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface FormDatePickerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
}

export const FormDatePicker: FC<FormDatePickerProps> = ({
  className,
  name,
  label,
  required,
  placeholder,
  ...props
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="font-bold mb-1">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "h-12 text-md w-full justify-between border-input text-black",
                !value && "text-muted-foreground"
              )}
              {...props}
            >
              {value ? format(value, "PPP", { locale: ru }) : <span>{placeholder}</span>}
              <CalendarIcon className="mr-2" size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={value}
              onSelect={(e) => {
                setValue(name, e);
                setIsCalendarOpen(false);
              }}
              locale={ru}
              fromYear={1960}
              toYear={2025}
              defaultMonth={value}
            />
          </PopoverContent>
        </Popover>
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2 font-medium" />}
    </div>
  );
};
