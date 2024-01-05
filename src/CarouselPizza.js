import React from 'react';
import {Carousel} from "react-bootstrap";

const CarouselPizza = ({path,alttitle},ref) => {
    return (
        <Carousel.Item  ref={ref}>
            <div className="d-flex justify-content-center align-items-center">
                <img src={path} alt={alttitle}
                     className="justify-content-center"
                     style={{ maxWidth: '70%' }}

                />
                <Carousel.Caption className="text-center">
                    <h3 className="responsive-heading">Margheritta</h3>
                </Carousel.Caption>
            </div>
        </Carousel.Item>
    );
};

export default CarouselPizza;