import React, {useContext, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {Card, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Profile = () => {
    const { isLog, log, nolog } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
        if (isLog) {
            fetch('http://localhost:5000/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setProfileData(data);
                })
                .catch(error => {
                    console.error('Błąd podczas wysyłania żądania:', error);
                });
        }
    }, [isLog]);


    if (!isLog) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {profileData ? (
                <div>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        <Card className="mt-3 mb-3 m-2 flex-fill" style={{ maxWidth: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Nazwa Użytkownika</Card.Title>
                                <Card.Text>
                                    {profileData.username}
                                </Card.Text>
                                <Button variant="primary">zmień nazwę użytkownika</Button>
                            </Card.Body>
                        </Card>
                        <Card className="mt-3 mb-3 m-2 flex-fill" style={{ maxWidth: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Email</Card.Title>
                                <Card.Text>
                                    {profileData.email}
                                </Card.Text>
                                <Button variant="primary">zmień email</Button>
                            </Card.Body>
                        </Card>
                        <Card className="mt-3 mb-3 m-2 flex-fill" style={{ maxWidth: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Licznik bonusu</Card.Title>
                                <Card.Text>
                                    {profileData.bonus_count}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <Button className="w-100 mb-1 mt-3" variant="outline-secondary">Zmień hasło</Button>
                    <div className="m-2">
                        <h2>Ostatnie zamówienia</h2>
                        <ListGroup>
                            {profileData.order.map(order => (
                                <ListGroup.Item key={order.id}>
                                    <h3>Zamówienie #{order.id}</h3>
                                    <p>Data zamówienia: {order.order_date}</p>
                                    <p>Szczegóły zamówienia:</p>
                                    <ListGroup>
                                        {order.order_details.map(detail => (
                                            <ListGroup.Item key={detail.pizza_id}>
                                                Nazwa Pizzy: {detail.pizza_id}, Ilość: {detail.pizza_count}, Cena: {detail.price}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            ) : (
                <p>Ładowanie danych profilu...</p>
            )}
        </div>
    );

};

export default Profile;
