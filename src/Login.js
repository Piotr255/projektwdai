import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const opts = {
            method: 'POST'
        }
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
