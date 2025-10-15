"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Info() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setAge(0);
    setEmail("");
  };

  const validationHandler = (e: FormEvent) => {
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
    localStorage.setItem(
      "info",
      JSON.stringify({
        firstName,
        lastName,
        age,
        email,
      })
    );
    console.log("123");
    router.push("/");
  };

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start mx-auto">
      <form onSubmit={validationHandler} className="flex flex-col w-sm">
        <input
          className="border-black border my-2 p-2 rounded-lg block w-full"
          type="text"
          value={firstName}
          name="firstname"
          placeholder="First Name e.g John"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="border-black border my-2 p-2 rounded-lg block w-full"
          type="text"
          value={lastName}
          name="lastName"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="border-black border my-2 p-2 rounded-lg block w-full"
          type="number"
          value={age === 0 ? "" : age} // show blank if age is 0
          name="age"
          placeholder="Age e.g 16"
          required
          onChange={(e) => {
            const value = e.target.value;
            setAge(value === "" ? 0 : parseInt(value, 10));
          }}
        />

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
            Submit
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 text-xl font-semibold text-gray-700 bg-gray-200 rounded-2xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </main>
  );
}
