/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClearButton, ErrorText, RequiredSymbol } from "@/common/ui";
import { FC, useRef, useState } from "react";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";
import { useFormContext } from "react-hook-form";
import { useEffectOnce } from "react-use";

interface Props {
  onChange?: (value?: string) => void;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormAddressInput: FC<Props> = ({ label, required, name, className }) => {
  const [daDataValue, setDaDataValue] = useState<DaDataSuggestion<DaDataAddress> | undefined>();
  const inputRef = useRef<any>(null);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
    setDaDataValue(undefined);
    if (inputRef.current) {
      inputRef.current.setInputValue("");
    }
  };

  useEffectOnce(() => {
    if (daDataValue?.value !== value) {
      if (inputRef.current) {
        inputRef.current.setInputValue(value);
      }
    }
  });

  return (
    <div className={className}>
      {label && (
        <p className="font-bold mb-1">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <AddressSuggestions
          ref={inputRef}
          token="24ddd0046ea08bba675148d9e4ce6f8ccee283f1"
          uid="dadata-address"
          containerClassName="relative"
          suggestionsClassName="absolute bg-white z-10 w-full flex flex-col max-h-[200px] mt-2 rounded-md border border-input overflow-auto shadow-xl scrollbar-hidden"
          suggestionClassName="flex items-start p-3 hover:bg-primary/25"
          highlightClassName="bg-transparent"
          inputProps={{
            className:
              "flex h-12 text-md white-autofill w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
            placeholder: "Начните вводить адрес, и воспользуйтесь подсказкой",
            ...register(name),
            onChange: (e) => {
              const target = e.target as HTMLInputElement;
              setValue(name, target.value, { shouldValidate: true });
            },
          }}
          onChange={(data) => {
            if (data?.value) {
              setValue(name, data.value, { shouldValidate: true });
              setDaDataValue(data);
            }
          }}
          value={daDataValue}
          defaultQuery={value}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2 font-medium" />}
    </div>
  );
};
