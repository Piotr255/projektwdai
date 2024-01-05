import React, {useContext, useState} from 'react';
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

import {AuthContext} from "./AuthContext";
import {Link, Navigate, useNavigate} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [noProblemReg, setnoProblemReg] = useState(true);
    const {isLog, isReg, reg, noreg, nolog } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        if (email === '' || username === '' || password === ''){
            setnoProblemReg(false);
        }else{
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
                        //throw new Error(`HTTP error! status: ${response.status}`);
                        return response.json();
                    }
                    return response.json();})
                .then(data => {
                    if (data === "User registered successfully"){
                        setnoProblemReg(true);
                        reg();

                    }
                    else{
                        setnoProblemReg(false);


                    }
                })
                .catch(error => {
                    console.error('Błąd podczas wysyłania żądania:', error);
                });
        }


    }


    const handleLogin = () => {
        navigate('/login');
    };

    function handleNewReg() {
        noreg();
        nolog();
    }
    //console.log(isReg);
    return (
        <div>
        {!noProblemReg && <h1 className=" text-center text-danger mt-3 mb-4">Podaj inne dane! Nie podawaj pustych danych</h1>}
        {!isReg && !isLog  ? (<Container className="d-flex justify-content-center mt-5 vh-100">
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
                        Zarejestruj się
                    </Button>
                </Form>
            </Container>) :
                (<Container className="d-flex justify-content-center align-items-center flex-column mt-5 vw-100">
                    <h2 className="text-center mt-3 ">Zostałeś pomyślnie zarejestrowany</h2>
                    {!isLog && (<Button  onClick={handleLogin} className="mt-4 mb-3 w-50" variant="success">Zaloguj się</Button>)}
                    <Button  onClick={handleNewReg} className="mt-2 mb-3 w-50" variant="primary">Stwórz nowe konto</Button>
                </Container>)}
        </div>
  );
};

export default Registration;
