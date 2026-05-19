"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";
import { socket } from "@/services/socket";
import { Feed } from "@/types/feed.types";
import FeedCard from "@/components/FeedCard";

export default function Home() {

  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeeds = async () => {
      try {
        const res = await api.get("/feed");
        setFeeds(res.data.feeds);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadFeeds();

    const handleNewFeed = (feed: Feed) => {
      setFeeds((prev) => [feed, ...prev]);
    };

    socket.on("newFeed", handleNewFeed);

    return () => {
      socket.off("newFeed", handleNewFeed);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Realtime Coaching Feed</h1>

      <div className="gr">
        {feeds.map((feed) => (
          <FeedCard key={feed._id} feed={feed} />
        ))}
      </div>
    </div>
  );
}