"use client";
import { Button } from "@repo/shadcn/components/ui/Button";

export default function Page() {
  const linkRoute = () => {
    window.location.href = "/tailwind";
  };
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button variant="link" onClick={() => linkRoute()}>
        tailwind page
      </Button>
    </main>
  );
}
