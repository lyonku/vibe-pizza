import { cn } from "@/common/lib/utils";
import { ClearButton, ErrorText, Input, RequiredSymbol } from "@/common/ui";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<FormInputProps> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const registerWithMask = useHookFormMask(register);

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-bold mb-1">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {props.type === "tel" ? (
          <Input
            className={cn("h-12 text-md white-autofill", errorText && "border-red-500")}
            {...registerWithMask("phone", ["+7 (999) 999-99-99", "8 (999) 999-99-99"], {
              required: true,
            })}
            placeholder="+7 (___) ___-__-__"
            {...props}
          />
        ) : (
          <Input
            className={cn("h-12 text-md white-autofill", errorText && "border-red-500")}
            {...register(name)}
            {...props}
          />
        )}

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2 font-medium" />}
    </div>
  );
};
