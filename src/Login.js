import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import data from "bootstrap/js/src/dom/data";

const Login = () => {
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
                "username": username,
                "password": password

            })
        }
        fetch("http://localhost:5000/login", opts)
            .then(response =>{
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();})
            .then(data => {
                console.log(data.access_token);
                localStorage.setItem("token",data.access_token);
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania żądania:', error);
            });
    }

    return (
        <Container className="d-flex justify-content-center mt-5 vh-100">
            <Form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Logowanie</h1>
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

export default Login;
