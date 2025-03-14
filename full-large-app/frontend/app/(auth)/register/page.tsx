"use client"

import Button from "@/app/components/button";
import TextInput from "@/app/components/textInput";
import useUserStore from "@/app/lib/user-store";
import { FormEvent, useState } from "react";


export default function SignUp(){
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const {token, setUser} = useUserStore();

    console.log(token);

    const onSubmit = async (e:FormEvent) => {
        e.preventDefault();
        let result = await fetch("http://localhost:8000/auth/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token || ''
            },
            body: JSON.stringify({
                "username":username,
                "first_name":firstName,
                "last_name":lastName
            })
        });
        let returns = await result.json();
        setUser({
            username: returns.username,
            firstName: returns.firstName,
            lastName: returns.lastName,
        })

    }

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-96">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <form onSubmit={onSubmit}>
                    <TextInput label="Username" value={username} onChange={setUsername} placeholder="Username" />
                    <TextInput label="First Name" value={firstName} onChange={setFirstName} placeholder="First Name" />
                    <TextInput label="Last Name" value={lastName} onChange={setLastName} placeholder="Last Name" />
                    <Button type="submit">Sign Up</Button>
                </form>
            </div>
        </div>
    )
}