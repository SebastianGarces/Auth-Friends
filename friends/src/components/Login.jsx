import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setTimeout(() => {
            axiosWithAuth()
                .post("/login", data)
                .then(res => {
                    localStorage.setItem("token", res.data.payload);
                    history.push("/friends");
                })
                .catch(err => console.error(err));
            reset();
        }, 1000);
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login to Friends</h1>
                <div className="container">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        name="username"
                        type="text"
                        placeholder="enter username"
                        ref={register}
                    />
                </div>
                <div className="container">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="enter password"
                        ref={register}
                    />
                </div>
                {isLoading && <p>Loading...</p>}
                <Button type="submit">Sign In</Button>
            </Form>
        </Layout>
    );
};

const Layout = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    background-color: gray;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 2rem;
    margin: 0 auto;
    min-width: 400px;
    border-radius: 10px;

    h1 {
        margin-bottom: 3rem;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        width: 100%;
    }

    background-color: lightgray;
`;

const Input = styled.input`
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    width: 100%;

    border: none;
    border-radius: 5px;
    background-color: white;

    font-size: 1rem;
`;

const Label = styled.label`
    margin-bottom: 3px;
`;

const Button = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: white;
`;

export default Login;
