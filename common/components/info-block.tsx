import React from "react";
import { Button } from "@/common/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/common/lib/utils";
import { Title } from "@/common/ui";
import Image from "next/image";

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div className={cn(className, "flex items-center justify-between gap-20")}>
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-2 w-[445px]">
          <Title size="xl" text={title} className="font-extrabold" />
          <p className="text-[#999999] text-xl">{text}</p>
        </div>

        <div className="flex gap-5">
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 h-[50px] px-5 font-semibold text-base"
            >
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button
              variant="outline"
              className="flex items-center gap-1 h-[50px] px-5 font-semibold text-base text-gray-500 border-gray-400 hover:bg-gray-50"
            >
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <Image src={imageUrl} alt={title} width={300} height={305} />
    </div>
  );
};
