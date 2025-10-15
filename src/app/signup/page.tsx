"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { json } from "stream/consumers";

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setAge(0);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();

    if (!/^[a-zA-Z]{3,20}$/.test(firstName)) {
      alert("please input a valid first name");
      return;
    }
    if (!/^[a-zA-Z]{3,20}$/.test(lastName)) {
      alert("please input a valid last name");
      return;
    }
    if (age < 1 || age > 120) {
      alert("Please input correct age");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("please input a valid email");
      return;
    }
    if (password.length < 8) {
      alert("password should be at least 8 characters");
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      alert("password is not the same");
      return;
    }

    const getItem = localStorage.getItem("users");

    if (getItem) {
      const users: any[] = JSON.parse(getItem);
      const user = users.find((user) => user.email === email);
      if (user) {
        alert("User already exist, login instead");
        return;
      } else {
        users.push({
          firstName,
          lastName,
          age,
          email,
          password,
        });
        localStorage.setItem("users", JSON.stringify(users));
      }
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            firstName,
            lastName,
            age,
            email,
            password,
          },
        ])
      );
    }

    router.push("/login");
  };

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
      <h1 className="text-2xl md:text-2xl font-bold">
        Create your hitlist account
      </h1>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start mx-auto">
        <form onSubmit={handleSignUp} className="flex flex-col w-sm">
          <label>Firstname</label>
          <input
            className="border-black border my-2 p-2 rounded-lg block w-full"
            type="text"
            value={firstName}
            name="firstname"
            placeholder="First Name e.g John"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Lastname</label>
          <input
            className="border-black border my-2 p-2 rounded-lg block w-full"
            type="text"
            value={lastName}
            name="lastName"
            placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
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

          <label>Confirm Password</label>
          <input
            className="border-black border my-2 p-2 rounded-lg block w-full"
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label>Age</label>
          <input
            className="border-black border my-2 p-2 rounded-lg block w-full"
            type="number"
            value={age === 0 ? "" : age} // show blank if age is 0
            name="age"
            min={21}
            placeholder="Minimum age is 21"
            required
            onChange={(e) => {
              const value = e.target.value;
              setAge(value === "" ? 0 : parseInt(value, 10));
            }}
          />

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

          <div className="flex justify-center gap-4 my-6">
  <button
    type="submit"
    className="px-6 py-2 text-xl font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 active:scale-95 transition-all duration-200"
  >
    Sign Up
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
            Already have an account?{" "}
            <a
              href="/login"
              className="underline text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Log in
            </a>
          </p>
        </form>
      </main>
    </main>
  );
}
