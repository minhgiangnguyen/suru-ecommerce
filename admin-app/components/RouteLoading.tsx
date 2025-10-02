// components/RouteLoading.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

export default function RouteLoading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Backdrop open={loading} sx={{ zIndex: 2000, color: "#fff" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
