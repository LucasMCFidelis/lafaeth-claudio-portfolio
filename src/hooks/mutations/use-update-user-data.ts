"use client"

import { useMutation } from "@tanstack/react-query";

import { updateUserData } from "@/actions/update-user-data";

export const getUpdateUserDataQueryKey = () => ["update-user-data"] as const;

export const useUpdateUserData = () => {
  return useMutation({
    mutationKey: getUpdateUserDataQueryKey(),
    mutationFn: updateUserData,
  });
};
