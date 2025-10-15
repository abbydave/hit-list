"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const getItem = localStorage.getItem("users");
    if (!getItem) {
      alert("This user does not exist, Sign up");
      return;
    } else {
      const users: any[] = JSON.parse(getItem);
      const user = users.find((user) => user.email === email);
      if (!user) {
        alert("User not found");
        return;
      } else {
        if (user.password !== password) {
          alert("Email and password does not match");
          return;
        }
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        router.push("/data");
      }
    }
  };

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
      <h1 className="text-2xl md:text-2xl font-bold">
        Log in to your hitlist account
      </h1>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start mx-auto">
        <form onSubmit={handleLogin} className="flex flex-col w-sm">
          <label>Email</label>
          <input
            className="border-black border my-2 p-2 rounded-lg block w-full"
            type="text"
            value={email}
            name="email"
            placeholder="Email e.g johndoe@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="border-black border my-2 p-2 rounded-lg block w-full"
            type="password"
            value={password}
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

         <div className="flex justify-center gap-4 my-6">
  <button
    type="submit"
    className="px-6 py-2 text-xl font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 active:scale-95 transition-all duration-200"
  >
    Log in
  </button>

  <button
    type="button"
    onClick={clearForm}
    className="px-6 py-2 text-xl font-semibold text-gray-700 bg-gray-200 rounded-2xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
  >
    Clear
  </button>
</div>


          <p className="text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="underline text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </form>
      </main>
    </main>
  );
}
