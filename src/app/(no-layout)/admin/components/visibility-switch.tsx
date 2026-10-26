"use client";

import { useId } from "react";
import { toast } from "sonner";

import { VisibilityEntity } from "@/app/data/schemas/update-visibility-schema";
import { Switch } from "@/components/ui/switch";
import { useUpdateVisibility } from "@/hooks/mutations/use-update-visibility";
import { cn } from "@/lib/utils";

interface VisibilitySwitchProps {
  entity: VisibilityEntity;
  id: string;
  visible: boolean;
  /** Text next to the switch when visible (default "Visível"). */
  visibleLabel?: string;
  /** Text next to the switch when hidden (default "Oculto"). */
  hiddenLabel?: string;
  className?: string;
}

/** Shows or hides an item on the site straight from its admin card. */
const VisibilitySwitch = ({
  entity,
  id,
  visible,
  visibleLabel = "Visível",
  hiddenLabel = "Oculto",
  className,
}: VisibilitySwitchProps) => {
  const switchId = useId();
  const updateVisibilityMutation = useUpdateVisibility(entity);

  return (
    <div
      className={cn(
        "absolute top-2 left-2 z-30 flex items-center gap-2 rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow",
        className
      )}
      // Keep clicks on the switch from reaching the card (links, slider).
      onClick={(e) => e.stopPropagation()}
    >
      <Switch
        id={switchId}
        checked={visible}
        onCheckedChange={(checked) =>
          updateVisibilityMutation.mutate(
            { id, visible: checked },
            {
              onError: () =>
                toast.error("Não foi possível alterar a visibilidade"),
            }
          )
        }
      />
      <label htmlFor={switchId} className="cursor-pointer select-none">
        {visible ? visibleLabel : hiddenLabel}
      </label>
    </div>
  );
};

export default VisibilitySwitch;
