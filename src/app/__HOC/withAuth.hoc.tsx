/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function withAuth(WrappedComponent:any) {
  const AuthWrapper = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return user ? <WrappedComponent {...props} /> : null;
  };

  return AuthWrapper;
}

export default withAuth;
