"use client";

import { useState } from "react";

import { api } from "@/services/api";

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
        <form onSubmit={submitHandler}>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <input
                placeholder="Author"
                value={author}
                onChange={(e) =>
                    setAuthor(e.target.value)
                }
            />

            <textarea
                placeholder="Description"
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
            />

            <button type="submit">
                Add Feed
            </button>
        </form>
    );
}