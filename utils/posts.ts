import clientPromise from "@/lib/mongodb";
import { Post } from "@/typescript/interfaces";
import { ObjectId } from "mongodb";


// Client
export const clientConnection = async () => {
  const client = await clientPromise;
  const db = client.db("Instagram"); //database
  return db;
};

// Managing All Posts
export const getAllPosts = async () => {
    try {
      const db = await clientConnection();
      const allPosts: any = await db.collection("posts").find({}).toArray();
      return allPosts;
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  export const deleteAllPosts = async () => {
    try {
      const db = await clientConnection();
      db.collection("posts").deleteMany({});
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  // Managing Single Post
  export const createPost = async (post: object) => {
    try {
      const db = await clientConnection();
      await db.collection("posts").insertOne(post);
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  export const updatePost = async (_id: string, likes:number) => {
    try {
      const db = await clientConnection();
      await db.collection("posts").updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            likes: likes,
          },
        }
      );
      return true;
    } catch (error) {
      console.log((error as Error).message);
      return false;
    }
  };
  export const getSinglePost= async (_id: any) => {
    try {
      const allPosts = await getAllPosts();
      const singlePost: Post = allPosts?.find(
        (singlePost: Post) => singlePost._id.toString() == _id
      );
      return singlePost;
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  export const deleteSinglePost = async (_id: any) => {
    try {
      const db = await clientConnection();
      const objId = new ObjectId(_id)
      await db.collection("posts").deleteOne({_id: objId});
    } catch (error) {
      console.log((error as Error).message);
    }
  };