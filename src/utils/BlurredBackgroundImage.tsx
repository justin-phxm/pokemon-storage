"use client";
import { type StaticImageData } from "next/image";
import Image from "next/image";
import { dynamicBlurDataUrl } from "./utils";
import { useEffect, useState } from "react";
/**
 * Blurs the background of any image passed in. Use z position to create a background effect
 */
export default function BlurredBackgroundImage({
  image,
}: {
  image?: StaticImageData;
}) {
  const [blurredImage, setBlurredImage] = useState<string>("");
  const blurImage = async () => {
    if (!image) return;
    try {
      const blurred = await dynamicBlurDataUrl(image.src);
      setBlurredImage(blurred);
    } catch (error) {
      console.error("Error blurring the image:", error);
    }
  };
  useEffect(() => {
    void blurImage();
  }, [image]);

  if (!image) return null;
  if (!blurredImage) return null;
  return (
    <Image
      src={blurredImage}
      className="absolute rounded-xl object-cover opacity-50"
      alt=""
      fill={true}
    />
  );
}
