import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { formatCEP } from "@/core/utils/format-cep";
import { formatCNPJ } from "@/core/utils/format-cnpj";
import { formatCPF } from "@/core/utils/format-cpf";
import { formatPhone } from "@/core/utils/format-phone";
import { formatRG } from "@/core/utils/format-rg";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/core/lib/utils";
import { formatPriceInput } from "@/core/utils/format-price";
import { Space_Grotesk } from "next/font/google";
import { CircleX, LucideIcon } from "lucide-react";
import { createElement } from "react";

const spaceSans = Space_Grotesk({
  variable: "--font-space-sans",
  subsets: ["latin"],
});

type InputFormProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  format?: "phone" | "cnpj" | "cpf" | "cep" | "rg" | "money";
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  maxLength?: number;
};

export const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  maxLength,
  format,
  placeholder,
  type = "text",
  icon,
  disabled,
  className,
}: InputFormProps<T>) => {
  const handleFormat = (value: string) => {
    const formats = {
      phone: formatPhone(value),
      cnpj: formatCNPJ(value),
      cep: formatCEP(value),
      cpf: formatCPF(value),
      rg: formatRG(value),
      money: formatPriceInput(value),
    };

    return format ? formats[format] : value;
  };

  const maxLengths = {
    phone: 15,
    cnpj: 18,
    cep: 9,
    cpf: 14,
    rg: 12,
    money: 99,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="relative space-y-2">
          {label && (
            <Label
              htmlFor={name}
              className={cn(
                fieldState.error && "!text-red-500",
                "absolute top-3 left-3.5 flex items-center gap-1.5",
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

          <Input
            id={name}
            placeholder={placeholder}
            type={type}
            maxLength={format ? maxLengths[format] : maxLength}
            disabled={disabled}
            {...field}
            value={handleFormat(field.value)}
            className={cn(
              className,
              fieldState.error && "!border-red-500",
              spaceSans.className,
              "!bg-zinc-950 px-4 !py-6 !pt-12 text-lg",
            )}
          />

          {/* {fieldState.error && ( */}
          {/*   <p className="text-sm text-red-500">{fieldState.error.message}</p> */}
          {/* )} */}
        </div>
      )}
    />
  );
};
