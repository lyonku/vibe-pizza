import { FC, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/ui";
import { FormDatePicker } from "@/common/components/form";

interface ProfileDatePickerProps {
  isBirthdayAdded: boolean;
}

const ProfileDatePicker: FC<ProfileDatePickerProps> = ({ isBirthdayAdded }) => {
  const [isBirthdayAlertAccepted, setBirthdayAlertAccepted] = useState(false);
  const [isBirthdayAlertOpen, setBirthdayAlertOpen] = useState(false);

  return (
    <div className="">
      <FormDatePicker
        disabled={isBirthdayAdded}
        name="birthday"
        label="Дата рождения"
        className="self-start sm:w-1/3"
        placeholder="Выберите дату рождения"
        onClick={(e) => {
          if (!isBirthdayAlertAccepted) {
            e.preventDefault();
            setBirthdayAlertOpen(true);
          }
        }}
      />

      <AlertDialog open={isBirthdayAlertOpen} onOpenChange={setBirthdayAlertOpen}>
        <AlertDialogContent className="max-md:rounded-[30px] max-md:max-w-[350px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Дата рождения будет неизменной</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Мы будем поздравлять вас и дарить скидки с подарками на день рождения. Однако изменить указанную
              дату в будущем будет невозможно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setBirthdayAlertAccepted(true)}>Понятно</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileDatePicker;
