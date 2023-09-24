"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../public/logo.png";
import { TfiVideoClapper } from "react-icons/tfi";
import { TiMessages } from "react-icons/ti";
import { BsBookmarkStar } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { LuPlusSquare } from "react-icons/lu";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleSidebar() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <div className="w-full">
      <div
        className={`fixed top-0 text-white text-4xl flex flex-row justify-end cursor-pointer w-full py-3 z-50 ${
          isOpen && "hidden"
        }`}
        id="navbar"
        onClick={handleSidebar}
      >
        <button className="font-xxl text-white rounded-3xl lg:mr-20 mr-6 flex flex-col gap-0">
          <RiMenu3Line size={35} />
        </button>
      </div>
      <div
        className={`sidebar fixed top-0 bottom-0 left-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center z-50 ${
          !isOpen && "hidden"
        }`}
        id="sidebar"
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex flex-row items-center justify-between">
            <div className="heading flex flex-row-reverse items-center gap-1 justify-start">
              <h1 className="font-bold text-gray-200 text-md ml-3">
                Instagram
              </h1>
              <Image src={logo} alt="Logo" width={50} height={50} />
            </div>

            <button
              // className="bi bi-x cursor-pointer ml-28 lg:hidden"
              onClick={handleSidebar}
            >
              <AiFillCloseCircle size={40} />
            </button>
          </div>
          <div className="my-2 bg-stone-50 h-[1px]"></div>
        </div>

        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-50/30 text-white">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/"
            className="text-[15px] ml-4 text-gray-200 font-bold flex flex-row gap-3 justify-center items-center"
          >
            <TfiVideoClapper size={30} />
            Posts
          </Link>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-50/30 text-white">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/create-post"
            className="text-[15px] ml-4 text-gray-200 font-bold flex flex-row gap-3 justify-center items-center"
          >
            <LuPlusSquare size={30} />
            Create
          </Link>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-50/30 text-white">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/"
            className="text-[15px] ml-4 text-gray-200 font-bold flex flex-row gap-3 justify-center items-center"
          >
            <TiMessages size={30} />
            Messages
          </Link>
        </div>
        <div className="my-4 bg-stone-50 h-[1px]"></div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-50/30 text-white">
          <div className="flex justify-between w-full items-center">
            <Link
              onClick={() => {
                setIsOpen(false);
              }}
              href="/"
              className="text-[15px] ml-4 text-gray-200 font-bold flex flex-row gap-3 justify-center items-center"
            >
              <BsBookmarkStar size={30} />
              Bookmarks
            </Link>
          </div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-stone-50/30 text-white">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/"
            className="text-[15px] ml-4 text-gray-200 font-bold flex flex-row gap-3 justify-center items-center"
          >
            <FiLogOut size={30} /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
