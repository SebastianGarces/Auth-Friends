import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const history = useHistory();

    const signOut = () => {
        localStorage.clear();
        history.push("/login");
    };

    const onSubmit = data => {
        setIsLoading(true);

        setTimeout(() => {
            axiosWithAuth()
                .post("/friends", data)
                .then(res => {
                    setIsLoading(false);
                    setFriends(res.data);
                })
                .catch(err => console.error(err));

            reset();
        }, 1000);
    };

    const unFriend = id => {
        axiosWithAuth()
            .delete(`/friends/${id}`)
            .then(res => setFriends(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        axiosWithAuth()
            .get("/friends")
            .then(res => {
                console.log(res.data);
                setFriends(res.data);
            });
    }, []);

    return (
        <Layout>
            <h1>Friends List</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add Friend</h1>
                <div className="container">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="enter name"
                        ref={register}
                    />
                </div>
                <div className="container">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        type="text"
                        placeholder="enter email"
                        ref={register}
                    />
                </div>
                <div className="container">
                    <Label htmlFor="age">Age</Label>
                    <Input
                        name="age"
                        type="text"
                        placeholder="enter age"
                        ref={register}
                    />
                </div>
                {isLoading && <p>Loading...</p>}
                <Button type="submit">Add Friend</Button>
            </Form>
            <FriendsList>
                {friends.map(friend => {
                    return (
                        <div className="container" key={friend.id}>
                            <h1>{friend.name}</h1>
                            <p>{friend.email}</p>
                            <p>{`Age: ${friend.age}`}</p>
                            <Button
                                style={{ backgroundColor: "lightgray" }}
                                onClick={() => unFriend(friend.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    );
                })}
            </FriendsList>
            <Button
                style={{ backgroundColor: "lightgray" }}
                onClick={() => signOut()}
            >
                Sign Out
            </Button>
        </Layout>
    );
};

const Layout = styled.section``;

const FriendsList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    .container {
        padding: 1rem;
        margin: 1rem;

        border: 1px solid red;
        border-radius: 10px;
    }
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

export default Friends;
