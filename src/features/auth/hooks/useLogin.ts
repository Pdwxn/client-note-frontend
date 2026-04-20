import { useMutation } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post("/token/", data);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // 🔥 REDIRECT
      router.push("/dashboard");
    },
  });
};