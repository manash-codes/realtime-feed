"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { socket } from "@/services/socket";

export default function Home() {

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    try {

      const res = await api.get("/feed");

      setFeeds(res.data.feeds);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchFeeds();

    const handleNewFeed = (feed) => {

      setFeeds((prev) => [feed, ...prev]);
    };

    socket.on("feed:new", handleNewFeed);

    return () => {
      socket.off("feed:new", handleNewFeed);
    };

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Realtime Coaching Feed</h1>

      {feeds.map((feed) => (
        <div key={feed._id}>
          <h3>{feed.title}</h3>
          <p>{feed.description}</p>
        </div>
      ))}
    </div>
  );
}