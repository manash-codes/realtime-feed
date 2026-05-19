import { Feed } from "@/types/feed.types";

export default function FeedCard({
    feed
}: { feed: Feed }) {

    return (
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className=" text-xl font-semibold text-gray-900">
                        {feed.title}
                    </h2>

                    <p className="text-gray-600 mt-2 leading-relaxed">
                        {feed.content}
                    </p>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
                {new Date(
                    feed.createdAt
                ).toLocaleString()}
            </div>
        </div>
    );
}