import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentArray = [
    {
      name: "Pediatricks",
      image_url: "/department/pedia.jpg"
    },
    {
      name: "Cardiology",
      image_url: "/department/cardio.jpg"
    },
    {
      name: "Derma",
      image_url: "/department/derma.jpg"
    },
    {
      name: "Denstist",
      image_url: "/department/ent.jpg"
    },
    {
      name: "Neuro",
      image_url: "/department/neuro.jpg"
    },
    {
      name: "Onco",
      image_url: "/department/onco.jpg"
    },
    {
      name: "Orthology",
      image_url: "/department/ortho.jpg"
    },
    {
      name: "Radiology",
      image_url: "/department/radio.jpg"
    },
    {
      name: "Therapy",
      image_url: "/department/therapy.jpg"
    },
  ]
  const responsive = {
    extraLarge: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slideToSlide: 1
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slideToSlide: 1
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slideToSlide: 1
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container department" removeArrowOnDeviceType={["medium", "small"]}>
      <h2>Department</h2>
      <Carousel responsive={responsive}>
       {
        departmentArray.map((item, index) => (
          <div key={index} className="card">
            <div className="depart-name">{item.name}</div>
            <img src={item.image_url} alt="image" />
          </div>
        ))
       }
      </Carousel>
      
    </div>
  );
};

export default Departments;
