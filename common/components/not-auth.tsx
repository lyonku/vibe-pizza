import { InfoBlock } from "@/common/components";
import Image from "next/image";
import { FC } from "react";

export const NotAuth: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-auto h-[calc(80vh)]">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        image={<Image src="/images/not-auth.svg" alt="" width={320} height={380} />}
      />
    </div>
  );
};
