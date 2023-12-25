import React, {useState} from 'react';
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": password

            })
        }
        fetch("http://localhost:5000/registration", opts)
            .then(response =>{
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();})
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania żądania:', error);
            });
    }

    return (
        <Container className="d-flex justify-content-center mt-5 vh-100">
            <Form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Rejestracja</h1>
                <FormGroup className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Wpisz email"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormControl
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Wpisz nazwę użytkownika"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Hasło</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wpisz hasło"
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="w-100">
                    Zaloguj się
                </Button>
            </Form>
        </Container>
  );
};

export default Registration;
