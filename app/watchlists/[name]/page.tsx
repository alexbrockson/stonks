'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { GetWatchlist } from "@/app/utils/Supabase";
import Alert from "@/app/components/alert";
import WatchlistCard from "@/app/components/WatchlistCard";

export default function WatchlistPage( { params }: { params: any} ) {
    const router = useRouter();

    const [watchlist, setWatchlist] = useState<any>(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        const getWatchlist = async () => {
            console.log(params);
            const { data, error } = await GetWatchlist(params.name);
            if (error) {
                console.log(error);
                setAlertMessage(error.message);
                setAlertType('error');
            }
            if (data) {
                setWatchlist(data);
            }
        }
        getWatchlist();
    }, []);



    return (
        <>
            {
                // home button
                <button className="btn btn-primary" onClick={() => router.back()}>Back</button>
            }
            {
                alertMessage &&
                (
                    <Alert message={alertMessage} type={alertType} />
                )
            }
            {
                watchlist &&
                (
                    <>
                        <WatchlistCard watchlist={watchlist}></WatchlistCard>
                    </>
                )
            }
        </>
    );
}