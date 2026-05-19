"use client";


import FeedForm from "@/components/FeedForm";

export default function AdminPage() {

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">
                Admin Panel
            </h1>
            <FeedForm />
        </div >
    );
}