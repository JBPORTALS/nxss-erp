import { api } from "~/trpc/server";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = await api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        {posts.map((post) => (
          <div>{post.content}</div>
        ))}
      </div>
    </main>
  );
}
