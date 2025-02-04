import React, { useState } from "react";
import Slider from 'react-slick';
import './carousel.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ items, onSelect }) => {
    const [hoveredItem, setHoveredItem] = useState(null); 
    const [selectedItem, setSelectedItem] = useState(null);


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        
        <div className="carousel">
            <Slider {...sliderSettings}>
                {items.map((item) => (
                    <div
                        key={item.ID}
                        className={`carousel-item ${
                            hoveredItem === item.ID ? "hovered" : ""
                          } ${selectedItem?.ID === item.ID ? "selected" : ""}`}
                          onMouseEnter={() => setHoveredItem(item.ID)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => {
                            setSelectedItem(item);
                            onSelect(item);
                          }}
                    >
                        <h3>{item.NAME}</h3>
                        <p>Цена: {item.PRICE}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Carousel