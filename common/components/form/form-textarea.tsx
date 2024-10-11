import React from "react";
import { useFormContext } from "react-hook-form";
import { ClearButton, ErrorText, RequiredSymbol, Textarea } from "@/common/ui";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      <p className="font-bold mb-2">
        {label} {required && <RequiredSymbol />}
      </p>
      <div className="relative">
        <Textarea className="text-md" {...register(name)} {...props} />
        {Boolean(value) && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2 font-medium" />}
    </div>
  );
};
