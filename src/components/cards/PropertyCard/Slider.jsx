import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
    const slides = [
        {
            url: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
        },
        {
            url: "https://cdn.pixabay.com/photo/2017/11/16/19/29/cottage-2955582_1280.jpg",
        },
        {
            url: "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg",
        },
    ];
    const [currentImage, setCurrentImage] = useState(0);
    const prevSlide = () => {
        const isFirstSlide = currentImage === 0;
        const newSlide = isFirstSlide ? slides.length - 1 : currentImage - 1;
        setCurrentImage(newSlide);
    };
    const nextSlide = () => {
        const isLastSlide = currentImage === slides.length - 1;
        const newSlide = isLastSlide ? 0 : currentImage + 1;
        setCurrentImage(newSlide);
    };
    const changeSlide = (index) => {
        setCurrentImage(index);
    };
    return (
        <div className="container h-[150px] w-full m-auto relative group">
            <div
                style={{ backgroundImage: `url(${slides[currentImage].url})` }}
                className="w-full rounded-t-xl h-full bg-center bg-cover duration-500"
            ></div>
            <div className="bg-[#f13439] rounded uppercase font-medium text-xs text-gray-100 absolute top-2 left-4 flex justify-center items-center gap-2 px-2 py-0.5">
                Sale
            </div>
            <div className="bg-text_dark rounded text-sm text-gray-200 absolute top-2 right-4 flex justify-center items-center gap-2 px-1">
                <FiCamera />
                {slides.length}
            </div>
            <div className="hidden group-hover:block absolute top-[35%] -translate-x-0 translate-y-1/2 left-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactLeft
                    onClick={prevSlide}
                    size={12}
                ></BsChevronCompactLeft>
            </div>
            <div className="hidden group-hover:block absolute top-[35%] -translate-x-0 translate-y-1/2 right-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactRight
                    onClick={nextSlide}
                    size={12}
                ></BsChevronCompactRight>
            </div>
            <div className="flex absolute right-1/2 -bottom-2 -translate-y-0 translate-x-1/2 py-2">
                {slides.map((slide, index) => {
                    return (
                        <div
                            key={slide.url}
                            className="text-2xl text-white cursor-pointer"
                        >
                            <RxDotFilled
                                onClick={() => changeSlide(index)}
                            ></RxDotFilled>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slider;
