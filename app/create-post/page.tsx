import React from "react";
import Form from "@/components/Form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create post",
  description: "Create new Instagram post and share it with your friends!",
};

const CreatePost = () => {
  return (
    <main id="create-post" className="py-20">
      <Form />
    </main>
  );
};

export default CreatePost;
