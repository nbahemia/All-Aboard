import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-4 ">
          <span className="text-[hsl(280,100%,70%)]">All-Aboard</span>
        </h1>
        <div className="container flex flex-col items-center justify-center gap-12 pt-4 pb-16">
          <div className="flex flex-col items-center gap-2">
            {session && (
              <p className="text-center text-2xl text-white">
                Logged in as {session.user?.name}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Log out" : "Log in"}
              </Link>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signup"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign up"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>

    </HydrateClient>
  );
}
