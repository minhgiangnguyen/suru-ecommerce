import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirectByAuth } from "../utils/auth";

export default function HomeRedirect() {
  const router = useRouter();
  useEffect(() => {
    redirectByAuth(router);
  }, [router]);
  return null;
}
