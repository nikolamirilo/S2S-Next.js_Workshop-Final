"use client";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import { Post } from "@/typescript/interfaces";
import Image from "next/image";
import { BsTrash3 } from "react-icons/bs";
import { revalidateData } from "@/utils/helpers";

const Card: React.FC<Post> = ({
  _id,
  username,
  location,
  title,
  description,
  image,
  likes,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState<number>(likes);

  async function handleLikeClick() {
    if (isClicked) {
      setIsClicked(false);
      setCurrentLikes((prevLikes) => prevLikes - 1);
    } else {
      setIsClicked(true);
      setCurrentLikes((prevLikes) => prevLikes + 1);
      try {
        const res = await fetch(`/api/posts/${_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store",
          },
          body: JSON.stringify({
            likes: currentLikes + 1,
          }),
        });
        console.log(res);
      } catch (error) {
        console.log(error as Error);
      }
    }
  }

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/posts/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store",
        },
      });
      console.log(res);
      revalidateData();
    } catch (error) {
      console.log(error as Error);
    }
  };

  useEffect(() => {
    setCurrentLikes(likes);
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white border rounded-md max-w-md relative">
        <button
          id="delete"
          className="absolute right-2 p-2 rounded-full hover:bg-red-500 top-2"
          onClick={handleDeletePost}
        >
          <BsTrash3 size={25} className="hover:fill-white" />
        </button>
        <div className="flex items-center px-4 py-3">
          <img
            className="h-8 w-8 rounded-full"
            src="https://th.bing.com/th/id/OIP.uypTEU9uX7OgNlOI9dp-NwHaHa?pid=ImgDet&rs=1"
          />
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">
              {username}
            </span>
            <span className="text-gray-600 text-xs block">{location}</span>
          </div>
        </div>
        <div
          className="relative"
          style={{
            height: "250px",
            width: "350px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Image src={image} fill style={{ objectFit: "cover" }} alt={title} />
        </div>
        <div className="flex items-center justify-between mx-4 mt-3 mb-2">
          <div className="flex gap-5">
            <button id="like" onClick={handleLikeClick}>
              {isClicked ? (
                <AiFillHeart size={30} className="fill-red-500" />
              ) : (
                <AiOutlineHeart size={30} />
              )}
            </button>
            <button id="comment">
              <FaRegComment size={25} />
            </button>

            <button id="share">
              <FiSend size={30} />
            </button>
          </div>
          <div className="flex">
            <button id="save">
              <BiBookmark size={30} />
            </button>
          </div>
        </div>

        <div className="mx-4 mt-2 mb-4">
          <div className="font-semibold text-md">{title}</div>
          <div className="font-normal text-md">{description}</div>
        </div>

        <div className="font-semibold text-sm mx-4 mt-2 mb-4 w-11/12 flex flex-row justify-end">
          {currentLikes} likes
        </div>
      </div>
    </div>
  );
};

export default Card;
