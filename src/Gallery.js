import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Carousel} from "react-bootstrap";
const Gallery = () => {
    let path = "/img/Margheritta.png";
    let title = "margh";
    return (
    <div className="m-5">
        <Carousel>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                <img src="/img/Margheritta.png" alt="Margheritta"
                     className="justify-content-center"
                     style={{ maxWidth: '48%' }}

                />
                <Carousel.Caption className="text-center">
                    <h3 className="responsive-heading">Margheritta</h3>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Prosciutto.png" alt="Prosciutto"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Prosciutto</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Chicken%20lux.png" alt="Chickenlux"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Chickenlux</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Farmerska.png" alt="Farmerska"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Farmerska</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Chicken%20Mexicana.png" alt="ChickenMexicana"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">ChickenMexicana</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Kentucky.png" alt="Kentucky"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Kentucky</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Szefa.png" alt="Szefa"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Szefa</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Z%20Rukolą.png" alt="Z Rukolą"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Z Rukolą</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/Grecka.png" alt="Grecka"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Grecka</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    </div>
  );
};

export default Gallery;
