import Card from "@/components/Card";
import { base_url } from "@/constants";
import { Post } from "@/typescript/interfaces";

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getPosts() {
  const res = await fetch(`${base_url}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main
      className="flex w-full flex-col justify-center items-center py-20 min-h-screen"
      id="home"
    >
      <section
        id="cards-container"
        className="flex flex-wrap w-fit justify-center items-center"
      >
        {posts?.map((post: Post) => {
          return (
            <Card
              key={post._id}
              _id={post._id}
              username={post.username}
              location={post.location}
              title={post.title}
              description={post.description}
              image={post.image}
              likes={post.likes}
            />
          );
        })}
      </section>
    </main>
  );
}
