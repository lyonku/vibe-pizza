import { Button } from "@/common/ui";
import { ChevronRight, IdCard, KeyRound, Phone } from "lucide-react";
import { FC } from "react";
import { FormType } from "../auth-modal";

interface Props {
  type: FormType;
  setType: (type: FormType) => void;
}

export const AlternativeBtnsLogin: FC<Props> = ({ type, setType }) => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="link"
        onClick={() => setType(type === "login" ? "phone-login" : "login")}
        type="button"
        className="justify-between"
      >
        <div className="flex items-center gap-3 text-base">
          {type === "login" ? <Phone strokeWidth={1.2} /> : <KeyRound strokeWidth={1.2} />}
          {type === "login" ? "Войти с телефоном" : "Войти с паролем"}
        </div>
        <ChevronRight strokeWidth={1} />
      </Button>
      {type !== "register" && (
        <Button variant="link" onClick={() => setType("register")} type="button" className="justify-between">
          <div className="flex items-center gap-3 text-base">
            <IdCard strokeWidth={1.2} />
            Зарегистрироваться
          </div>
          <ChevronRight strokeWidth={1} />
        </Button>
      )}
    </div>
  );
};
