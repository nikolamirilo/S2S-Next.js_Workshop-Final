"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import logo from "../public/logo.png";
import { CloudinaryResponse } from "@/typescript/interfaces";
import { revalidateData } from "@/utils/helpers";

const Form: React.FC = () => {
  const [displayImage, setDisplayImage] = useState("");
  const usernameInput = useRef<HTMLInputElement>(null);
  const locationInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  //Display different image every time new image is changed
  const handleInputImageChange = (e: any) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDisplayImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formData = new FormData();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const file = await fileInput?.current?.files?.[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    formData.append("file", file);
    console.log(file);
    formData.append("upload_preset", "my-uploads");
    var image = "";
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbp2wnqco/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Image upload failed: ${response.statusText}`);
      }

      // Now, extract and parse the JSON response correctly
      const uploadImage: CloudinaryResponse = await response.json();
      image = uploadImage.url;
      // Rest of your code here, if needed
    } catch (error) {
      console.error("Error:", error);
    }

    const uploadData = {
      username: usernameInput.current!.value,
      location: locationInput.current!.value,
      title: titleInput.current!.value,
      description: descriptionInput.current!.value,
      likes: 0,
      image: image,
    };

    console.log(uploadData);
    await fetch("/api/posts/create-post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    }).then((response) => {
      console.log(response);

      //Set Initial data
      usernameInput.current!.value = "";
      locationInput.current!.value = "";
      titleInput.current!.value = "";
      descriptionInput.current!.value = "";
      setDisplayImage("");

      if (response.ok) {
        revalidateData();
        alert("Vas odgovor je zabelezen");
      } else {
        console.log(response.statusText);
      }
    });
  };

  return (
    <div className="flex justify-center lg:py-8 px-2 sm:px-16 lg:px-52 pb-8 w-full bg-white">
      <div className="lg:w-8/12 w-full bg-white block rounded-lg px-4 py-16 sm:p-4 lg:p-16 md:border-2  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="text-center">
          <Image
            className="mx-auto"
            src={logo}
            alt="Leafs"
            width={100}
            height={100}
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create a new Instagram Post!
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          encType="multipart/form-data"
          name="Form"
          method="POST"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Username:
            </label>
            <div className="mt-1">
              <input
                ref={usernameInput}
                placeholder="e.g. @john.doe"
                id="username"
                name="username"
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-400 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Location:
            </label>
            <div className="mt-1">
              <input
                ref={locationInput}
                id="location"
                name="location"
                placeholder="e.g. Budapest, Hungary"
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-400 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Post Title:
            </label>
            <div className="mt-1">
              <input
                ref={titleInput}
                id="title"
                name="title"
                placeholder="e.g. My First Post on Instagram!"
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-400 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Post Description:
            </label>
            <div className="mt-1">
              <textarea
                ref={descriptionInput}
                placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                id="description"
                name="description"
                rows={4}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-400 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Post Image:
            </label>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-input"
                  className="flex relative flex-col items-center justify-center bg-center bg-cover w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:border-purple-400"
                >
                  {displayImage !== "" ? (
                    <Image
                      src={displayImage}
                      fill
                      className="object-cover object-center"
                      priority
                      alt="Background"
                    />
                  ) : null}
                  <div
                    className={`flex flex-col items-center justify-center pt-5 pb-6 ${
                      displayImage == "" ? "" : "hidden"
                    }`}
                  >
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    onChange={handleInputImageChange}
                    id="image-input"
                    ref={fileInput}
                    name="image-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              id="submit-button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-purple-400"
              onClick={(e: any) => {
                handleFormSubmit(e);
              }}
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
