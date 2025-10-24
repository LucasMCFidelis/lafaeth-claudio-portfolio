"use client"

import { parseAsBoolean, useQueryState } from "nuqs";

export const useFormIsEditable = () => {
    return useQueryState(
    "formIsEditable",
    parseAsBoolean.withDefault(false)
  );
}
 