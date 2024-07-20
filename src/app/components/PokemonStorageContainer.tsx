"use client";
import React, { useRef, useState } from "react";
import PokemonStorageBox from "./PokemonStorageBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperCore from "swiper";

export default function PokemonStorageContainer() {
  const NUM_BOXES = 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const [clearSignal, setClearSignal] = useState<number | null>(null);
  const swiperRef = useRef<SwiperCore>();
  const handleClearButtonClick = () => {
    setClearSignal(activeIndex);
  };
  return (
    <div className="max-w-4xl">
      <button
        className="rounded-xl bg-slate-500/50 p-4 px-8 text-xl font-semibold"
        onClick={handleClearButtonClick}
      >
        Clear {activeIndex}
      </button>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={50}
        slidesPerView={1}
        style={{ padding: "1rem" }}
      >
        {Array.from({ length: NUM_BOXES }, (_, index) => (
          <SwiperSlide key={index}>
            <PokemonStorageBox
              boxNumber={index}
              clearSignal={clearSignal}
              resetClearSignal={() => setClearSignal(null)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-between">
        <button
          onClick={() => {
            if (swiperRef.current?.activeIndex) {
              setActiveIndex(swiperRef.current.activeIndex - 1);
            }
            swiperRef.current?.slidePrev();
          }}
        >
          {"<- Back"}
        </button>
        <button
          onClick={() => {
            swiperRef.current?.slideNext();
            if (swiperRef.current?.activeIndex) {
              setActiveIndex(swiperRef.current.activeIndex);
            }
          }}
        >
          {"Next ->"}
        </button>
      </div>
    </div>
  );
}
