"use client"
import { useRouter } from "next/navigation";
import Info from "./info";

export default function Home() {
  const router = useRouter()
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const userString = localStorage.getItem("userInfo")

  if(!isLoggedIn || !userString) {
    return router.push("/login")
  }
  const user = JSON.parse(userString)
   

  return (
<main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
    <h1  className="text-2xl md:text-2xl font-bold">{`Hi ${user.firstName}, Kindly provide the following information of your target`}</h1>

    <Info/>
</main>

  );

}