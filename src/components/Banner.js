import React from "react";

const Banner = ({ imageUrl, altText }) => {
  return (
    <div className="banner">
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default Banner;
