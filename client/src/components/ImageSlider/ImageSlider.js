import React, { useState } from "react";
import * as images from "../../assets/images";
import * as icons from "../../assets/icons";

import "./ImageSlider.css";

const imagesData = [
  {
    image: images.hostelImage,
    alt: "hostel",
  },
  {
    image: images.facilitiesImage,
    alt: "facilities",
  },
];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleLeftImage = () => {
    if (currentImage === 0) {
      setCurrentImage(imagesData.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleRightImage = () => {
    if (currentImage === imagesData.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  return (
    <div className="image-slider">
      <img
        src={icons.leftArrowIcon}
        alt="left"
        className="left-arrow"
        onClick={handleLeftImage}
      />
      <img
        src={icons.rightArrowIcon}
        alt="right"
        className="right-arrow"
        onClick={handleRightImage}
      />
      {imagesData.map((slide, indx) => {
        return (
          <div
            className={indx === currentImage ? "slide active" : "slide"}
            key={indx}
          >
            {indx === currentImage && (
              <img src={slide.image} alt={slide.alt} className="main-image" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
