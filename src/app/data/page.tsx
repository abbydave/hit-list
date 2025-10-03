import Info from "./info";

export default function Home() {
  return (
<main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
    <h1  className="text-2xl md:text-2xl font-bold">Kindly provide the following information</h1>
    <Info/>
</main>

  );

}