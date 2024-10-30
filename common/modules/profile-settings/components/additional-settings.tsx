"use client";
import { deleteUser } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Title,
} from "@/common/ui";
import { Trash } from "lucide-react";
import { signOut } from "next-auth/react";
import { FC, useState } from "react";

interface AdditionalSettingsProps {}

export const AdditionalSettings: FC<AdditionalSettingsProps> = () => {
  const [, setActiveTheme] = useState("light");
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const handleThemeChange = (theme: "dark" | "light" | "system") => {
    setActiveTheme(theme);
  };

  return (
    <div className="px-[35px] pb-[35px] pt-[30px] bg-white rounded-[30px] flex-1 w-1/2 h-[max-content]">
      <Title text="Дополнительные настройки" size="md" className="font-bold" />
      <div className="flex flex-col gap-12 mt-10 justify-between ">
        <div className="">
          <p className="font-bold mb-1">Тема:</p>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-2 w-full">
              <Button
                variant="default"
                size="lg"
                onClick={() => handleThemeChange("light")}
                className="w-1/2 text-base"
              >
                Светлая
              </Button>
              <Button
                disabled
                variant="outline"
                size="lg"
                onClick={() => handleThemeChange("dark")}
                className="w-1/2 text-base"
              >
                Темная
              </Button>
            </div>

            <Button
              disabled
              variant="outline"
              size="lg"
              onClick={() => handleThemeChange("system")}
              className="w-full text-base"
            >
              Как в системе
            </Button>
          </div>
        </div>

        <button
          type="button"
          className="flex text-gray-500 items-center gap-2 text-sm self-end hover:text-red-500 transition-colors"
          onClick={() => setDeleteAlertOpen(true)}
        >
          <Trash size={14} />
          Удалить аккаунт
        </button>

        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">Удаление аккаунта</AlertDialogTitle>
              <AlertDialogDescription className="text-base mb-4">
                Ваш аккаунт и все связанные с ним данные будут безвозвратно удалены. Это действие будет
                невозможно отменить.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className="bg-white border border-primary text-primary hover:bg-secondary"
                onClick={() => setDeleteAlertOpen(false)}
              >
                Отмена
              </AlertDialogAction>
              <AlertDialogAction
                onClick={() => {
                  signOut();
                  deleteUser();
                }}
              >
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
