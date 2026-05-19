"use client";

import { useState } from "react";

import { api } from "@/services/api";
import FeedForm from "@/components/FeedForm";

export default function AdminPage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            await api.post("/feed", {
                title,
                content,
                author,
            });

            setTitle("");
            setContent("");
            setAuthor("");

            alert("Feed Added");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">
                Admin Panel
            </h1>
            <FeedForm />
        </div >
    );
}