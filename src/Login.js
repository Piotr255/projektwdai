import React, {useContext, useState} from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import data from "bootstrap/js/src/dom/data";
import {AuthContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isLog, log, nolog } = useContext(AuthContext);
    const navigate = useNavigate();
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
                //console.log(data.access_token);
                localStorage.setItem("token",data.access_token);
                log();
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania żądania:', error);
            });
    }

    function handleLogin() {
        navigate('/menu');
    }
    console.log(isLog);
    return (
        <div>
            {!isLog ? (<Container className="d-flex justify-content-center mt-5 vh-100">
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
            </Container>) :  (<Container className="d-flex justify-content-center align-items-center flex-column mt-5 vw-100">
                <h2 className="text-center mt-3 ">Zostałeś pomyślnie zalogowany</h2>
                <Button  onClick={handleLogin} className="mt-4 mb-3 w-50" variant="success">Przejdź do menu</Button>
            </Container>)}
        </div>
    );
};

export default Login;
