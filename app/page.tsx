import Card from "@/components/Card";

async function getData() {
  const res = await fetch(
    "https://s2-s-next-js-workshop-final.vercel.app/api/posts",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const posts = await getData();
  return (
    <main
      className="flex w-full flex-col justify-center items-center py-20"
      id="home"
    >
      <section
        id="cards-container"
        className="flex flex-wrap w-fit justify-center items-center"
      >
        {posts?.map((post: any) => {
          return (
            <Card
              key={post._id}
              _id={post._id}
              authorUsername={post.username}
              authorImage="https://th.bing.com/th/id/OIP.uypTEU9uX7OgNlOI9dp-NwHaHa?pid=ImgDet&rs=1"
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
