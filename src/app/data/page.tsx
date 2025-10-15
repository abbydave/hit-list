"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Info from "./info";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userString, setUserString] = useState<string | null>(null);

  useEffect(() => {
    // Only run in browser
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = localStorage.getItem("userInfo");

    setIsLoggedIn(loggedIn);
    setUserString(user);

    // Redirect only after we know the values
    if (!loggedIn || !user) {
      router.push("/login");
    }
  }, [router]);

  // While checking login, render nothing (to avoid flicker)
  if (isLoggedIn === null) {
    return null;
  }

  // Prevent crash if parsing fails
  let user: { firstName?: string } = {};
  try {
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch {
    console.error("Invalid user data in localStorage");
  }

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
      <h1 className="text-2xl md:text-2xl font-bold">
        {`Hi ${user.firstName || "User"}, kindly provide the following information of your target`}
      </h1>
      <Info />
    </main>
  );
}
