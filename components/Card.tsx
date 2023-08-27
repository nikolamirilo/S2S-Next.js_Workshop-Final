"use client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";

export interface Props {
  authorUsername: string;
  authorImage: string;
  location: string;
  title: string;
  description: string;
  image: string;
  likes: string;
}

const Card: React.FC<Props> = ({
  authorUsername,
  authorImage,
  location,
  title,
  description,
  image,
  likes,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleLikeClick() {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }
  return (
    <div className="p-4">
      <div className="bg-white border rounded-md max-w-md">
        <div className="flex items-center px-4 py-3">
          <img className="h-8 w-8 rounded-full" src={authorImage} />
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">
              {authorUsername}
            </span>
            <span className="text-gray-600 text-xs block">{location}</span>
          </div>
        </div>
        <img src={image} />
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
          {likes} likes
        </div>
      </div>
    </div>
  );
};

export default Card;
