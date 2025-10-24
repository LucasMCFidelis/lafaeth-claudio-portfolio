"use client";

import { Button } from "@/components/ui/button";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";
import { cn } from "@/lib/utils";

interface ActionsUpdateFormProps {
  disableSaveUpdateAction?: boolean;
  textSaveUpdateAction: string;
  resetForm: () => void;
  className?: string
}

const ActionsUpdateForm = ({
  disableSaveUpdateAction,
  textSaveUpdateAction,
  resetForm,
  className
}: ActionsUpdateFormProps) => {
  const [formIsEditable, setFormIsEditable] = useFormIsEditable();

  return (
    <div className={cn("flex w-full gap-4 justify-between", className)}>
      <Button
        type="button"
        onClick={() =>
          setFormIsEditable((old) => {
            const newValue = !old;
            if (newValue === false) {
              resetForm();
            }
            return newValue;
          })
        }
        variant={formIsEditable ? "destructive" : "default"}
        className={`${!formIsEditable ? "flex-1" : "flex-1/2"}`}
      >
        {formIsEditable ? "Cancelar edição" : "Habilitar edição"}
      </Button>
      {formIsEditable && (
        <Button
          type="submit"
          className="flex-1/2"
          disabled={disableSaveUpdateAction}
        >
          {textSaveUpdateAction}
        </Button>
      )}
    </div>
  );
};

export default ActionsUpdateForm;
