import HorizontalNews from "./components/HorizontalNews";

export default function Home() {
  return (
    <main className="section-container py-10">
      {/* @ts-expect-error Server Component */}
      <HorizontalNews category="mobile" />

      {/* @ts-expect-error Server Component */}
      <HorizontalNews category="computers" rightTitle />
    </main>
  );
}
