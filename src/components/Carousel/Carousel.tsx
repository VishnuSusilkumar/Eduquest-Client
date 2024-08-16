import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

const Carousell = () => {
  return (
    <Carousel
      placeholder={""}
      autoplay
      loop
      className="rounded-xl mb-10 h-[30rem]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      onPointerEnterCapture={() => {}} // Add these empty handlers
      onPointerLeaveCapture={() => {}} // Add these empty handlers
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-image-store-1d566.appspot.com/o/assets%2Fel1.jpg?alt=media&token=d9bfb361-b82b-477f-be76-2ffe5a1a6917"
        className="h-full w-full object-cover"
        alt=""
        width={3000}
        height={3000}
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-image-store-1d566.appspot.com/o/assets%2Fel2.jpg?alt=media&token=dccba883-f112-4041-9e0b-c63166ffc701"
        alt="image 2"
        className="h-full w-full object-cover"
        width={3000}
        height={3000}
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-image-store-1d566.appspot.com/o/assets%2Fel3.jpg?alt=media&token=3ae8c6cc-0b2d-4360-8211-901062a9c4b6"
        alt=""
        width={3000}
        height={3000}
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default Carousell;
