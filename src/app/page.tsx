import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col p-10 ">
        This is The hydrated Client page
        <Link href={'/dashboard'}>
        <Button variant={"outline"}>
          Dashboard
        </Button>
        </Link>
      </main>
    </HydrateClient>
  );
}
