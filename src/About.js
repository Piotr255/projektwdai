import React from 'react';
import {Card, Carousel} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const About = () => {
  return (
    <div>
        <Carousel className="mt-3">
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/family1.png" alt="family1"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Nasza rodzina 1</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex justify-content-center align-items-center">
                    <img src="/img/family2.png" alt="family2"
                         className="justify-content-center"
                         style={{ maxWidth: '48%' }}

                    />
                    <Carousel.Caption className="text-center">
                        <h3 className="responsive-heading">Nasza rodzina 2</h3>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
        <Card className="mt-3 mb-3 m-2 flex-fill ">
            <Card.Body>
                <Card.Title>Nasza historia</Card.Title>
                <Card.Text>
                    <p>Witamy w Pizzerii Pieczarka – miejscu, gdzie tradycja łączy się z nowoczesnością, tworząc niezapomniane doznania kulinarne. Nasza pizzeria, położona w sercu malowniczego miasteczka, zaprasza odwiedzających do odkrywania smaków autentycznej, włoskiej pizzy.

                        Założona w 1998 roku przez rodzinę Bianchi, pasjonatów kuchni włoskiej, Pizzeria Pieczarka szybko zyskała miano lokalnej perły dzięki swojemu niepowtarzalnemu podejściu do pieczenia pizzy. W naszej kuchni łączymy tradycyjne metody przygotowania z nowoczesnymi technikami, aby każda pizza była dziełem sztuki kulinarnej.

                        Wnętrze naszej pizzerii to mieszanka włoskiego stylu i nowoczesnego designu, tworząca przytulną i rodzinną atmosferę. Ściany zdobią ręcznie malowane freski przedstawiające pejzaże Toskanii, a w tle słychać delikatne dźwięki włoskiej muzyki.

                        Nasze menu zawiera szeroki wybór pizz, od klasycznych receptur po nowatorskie kompozycje. Nasz szef kuchni, Giovanni Rossi, słynie z wyjątkowej umiejętności łączenia składników. Szczególnie polecamy naszą specjalność – Pizzę Pieczarkową, przygotowywaną z lokalnych, świeżych pieczarek i wyselekcjonowanych włoskich serów.

                        W Pizzerii Pieczarka stawiamy na jakość – używamy tylko świeżych, lokalnych składników, a nasze ciasto na pizzę jest wyrabiane ręcznie każdego dnia. Wierzymy, że prawdziwa pizza to nie tylko posiłek, ale doświadczenie, które łączy ludzi.

                        Zapraszamy do odwiedzenia nas i doświadczenia magii prawdziwej włoskiej pizzy w Pizzerii Pieczarka. Buon appetito!

                    </p>

                </Card.Text>
            </Card.Body>
        </Card>
        <Container className="d-flex justify-content-center align-items-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.460284598708!2d19.902090076464!3d50.07766857152342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165be774e18441%3A0x725e2eb7798fd827!2sBalletto%20pizzeria!5e0!3m2!1spl!2spl!4v1704492932124!5m2!1spl!2spl"
                           width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
        </iframe></Container>

    </div>
  );
};

export default About;
