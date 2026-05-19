"use client";

import { useState } from "react";

import { api } from "@/services/api";

export default function FeedForm() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const [loading, setLoading] =
        useState(false);

    const submitHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/feed", {
                title,
                content,
                author
            });

            setTitle("");
            setContent("");
            setAuthor("");

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className=" bg-white rounded-2xl shadow-md p-6 space-y-5"
        >
            <label className="text-lg font-medium text-gray-900">
                Title
            </label>
            <input
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                placeholder="Feed Title"
                className="w-full border rounded-xl px-4 py-3 text-black"
            />

            <label className="text-lg font-medium text-gray-900">
                Author
            </label>
            <input
                value={author}
                onChange={(e) =>
                    setAuthor(e.target.value)
                }
                placeholder="Feed Author"
                className="w-full border rounded-xl px-4 py-3 text-black"
            />

            <label className="text-lg font-medium text-gray-900">
                Content
            </label>
            <textarea
                rows={5}
                value={content}
                onChange={(e) =>
                    setContent(
                        e.target.value
                    )
                }
                placeholder="Feed Content"
                className="w-full border rounded-xl px-4 py-3 text-black"
            />

            <button
                disabled={loading}
                className="bg-black text-white px-5 py-3 rounded-xl font-medium hover:opacity-90"
            >
                {loading
                    ? "Publishing..."
                    : "Publish Feed"}
            </button>
        </form>
    );
}