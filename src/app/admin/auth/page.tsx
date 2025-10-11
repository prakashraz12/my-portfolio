"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { firebase_app, loginWithGoogle } from "@/lib/utils";
import { FIREBASE_USER } from "@/lib/types/types";

export default function LoginPage() {
  const [user, setUser] = useState<FIREBASE_USER | null>(null);
  const router = useRouter();
  const auth = getAuth(firebase_app);

  // Check authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user as FIREBASE_USER);
        router.push("/admin/dashboard");
      } else {
        setUser(null);
      }
    });
  }, [auth, router]);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      setUser(user as FIREBASE_USER);
      router.replace("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <div>
          <p>Welcome, {user?.displayName}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
