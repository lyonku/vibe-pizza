import { cn } from "@/common/lib/utils";
import { ClearButton, ErrorText, Input, RequiredSymbol } from "@/common/ui";
import { Eye, EyeOff } from "lucide-react";
import { FC, FocusEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEffectOnce } from "react-use";
import { useHookFormMask } from "use-mask-input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  autoCompleteFix?: boolean;
}

export const FormInput: FC<FormInputProps> = ({
  inputClassName,
  className,
  name,
  label,
  required,
  autoCompleteFix,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const registerWithMask = useHookFormMask(register);
  const [isPasswordShow, setPasswordShow] = useState(false);

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target) {
      e.target.value = e.target.value;
      e.target.focus();
    }
  };

  useEffectOnce(() => {
    if (autoCompleteFix) {
      const timeout = setTimeout(() => {
        const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
        if (input && input.value) {
          setValue(name, input.value);
        }
      }, 300);

      return () => clearTimeout(timeout);
    }
  });

  const isPassword = props.type === "password";

  return (
    <div className={className}>
      {label && (
        <p className="font-bold mb-1">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative ">
        {props.type === "tel" ? (
          <Input
            className={cn("h-12 text-md white-autofill pr-10", errorText && "border-red-500", inputClassName)}
            placeholder="+7 (XXX) XXX-XX-XX"
            defaultValue={value}
            {...registerWithMask("phone", ["+7 (999) 999-99-99", "8 (999) 999-99-99"], {
              required: true,
            })}
            {...props}
          />
        ) : (
          <Input
            className={cn("h-12 text-md pr-10", errorText && "border-red-500", inputClassName)}
            onFocus={handleFocus}
            defaultValue={value}
            {...register(name)}
            {...props}
            type={isPassword && isPasswordShow ? "text" : props.type}
          />
        )}

        {value && !isPassword && <ClearButton onClick={onClickClear} />}
        {value && isPassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer transition-opacity"
            onClick={() => setPasswordShow((prev) => !prev)}
          >
            {isPasswordShow ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2 font-medium" />}
    </div>
  );
};
