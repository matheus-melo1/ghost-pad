import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CircleX, type LucideIcon } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { createElement } from "react";
import {
  type FieldValues,
  type Path,
  type Control,
  Controller,
} from "react-hook-form";

const spaceSans = Space_Grotesk({
  variable: "--font-space-sans",
  subsets: ["latin"],
});

type SelectFormProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
};

export const SelectForm = <T extends FieldValues>({
  name,
  control,
  label,
  children,
  placeholder,
  icon,
  className,
}: SelectFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <div className="relative space-y-2">
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  fieldState.error && "!text-red-500",
                  "absolute top-3 left-4 flex items-center gap-1.5",
                )}
              >
                {fieldState.error ? (
                  <CircleX className="h-4 w-4" />
                ) : (
                  icon && createElement(icon, { className: "w-4 h-4" })
                )}
                {fieldState.error ? fieldState.error.message : label}
              </Label>
            )}

            <Select
              {...field}
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <SelectTrigger
                className={cn(
                  className,
                  fieldState.error && "!border-red-500",
                  spaceSans.className,
                  "!bg-zinc-950 px-4 !py-6 !pt-12 text-lg",
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </Select>

            {/* {fieldState.error && ( */}
            {/*   <p className="text-sm text-red-500">{fieldState.error.message}</p> */}
            {/* )} */}
          </div>
        </>
      )}
    />
  );
};
