'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetWatchlists } from "../utils/Supabase";
import Watchlist from "../utils/Watchlist";

export default function Watchlists() {
    const [data, setWatchlistData] = useState<any>(null);

    useEffect(() => {
        const getWatchlists = async () => {
            const { data, error } = await GetWatchlists()
            if (error) {
                setWatchlistData(null);
                console.log(error);
            }
            if (data) {
                setWatchlistData(data);
            }
        };
        getWatchlists();
    }, []);

    return (
        <div>
            {data && (
                <div>
                    {data.map((watchlist: Watchlist) => (
                        <button key={watchlist.id} className="btn btn-wide watchlist-button">
                            <Link href={`/watchlists/${watchlist.name}`}>{watchlist.name}</Link>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}