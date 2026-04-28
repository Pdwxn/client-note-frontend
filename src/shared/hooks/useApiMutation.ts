import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getErrorMessage } from "../utils/apiError";

type MutationVariables = {
  [key: string]: unknown;
};

export function useApiMutation<TData, TVariables extends MutationVariables = MutationVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, AxiosError, TVariables>,
    "mutationFn"
  >
) {
  return useMutation<TData, AxiosError, TVariables>(mutationFn, {
    ...options,
    onError: (error, variables, context) => {
      const message = getErrorMessage(error);
      options?.onError?.(error, variables, context);
    },
  });
}