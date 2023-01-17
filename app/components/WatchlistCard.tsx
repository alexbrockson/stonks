import { useState, useEffect } from "react";
import Watchlist from "../utils/Watchlist";
import StockCard from "./StockCard";
import { UpdateWatchlistStocks } from '../utils/Supabase';

type Props = { watchlist: Watchlist }

export default function WatchlistCard({ watchlist }: Props) {
    const [newSymbol, setNewSymbol] = useState<string>('');

    watchlist.symbolArray = watchlist.stocks!.split(",");

    const addSymbol = async (newSymbol: string) => {
        console.log('adding ' + newSymbol);
        newSymbol = newSymbol.trim().replace(' ', '');
        let newWatchlist = watchlist;
        console.log(newWatchlist);
        newWatchlist.stocks = watchlist.stocks!.concat(',' + newSymbol);
        console.log(newWatchlist.stocks);
        const { data, error } = await UpdateWatchlistStocks(newWatchlist);
        if (error) {
            console.log(error);
        }
        if (data) {
            window.location.reload();
            console.log(data);
        }
    }

    const removeSymbol = async (removeSymbol: string) => {
        console.log('removing ' + removeSymbol);
        console.log(watchlist.stocks);
        watchlist.stocks = watchlist.stocks!.replace(removeSymbol, '').replace(',,', ',');

        // trim trailing comma if it exists
        if (watchlist.stocks!.endsWith(',')) {
            watchlist.stocks = watchlist.stocks!.slice(0, -1);
        }

        console.log(watchlist.stocks);
        const { data, error } = await UpdateWatchlistStocks(watchlist);
        if (error) {
            alert("error removing " + removeSymbol);
        }
        if (data) {
            console.log('removed ' + removeSymbol);
            window.location.reload();
        }
    }

    // focus on txtNewSymbol when btn-add-modal is clicked (this doesn't work yet)
    useEffect(() => {
        const btnAddModal = document.getElementById('btn-add-modal');
        const txtNewSymbol = document.getElementById('txtNewSymbol');
        if (btnAddModal && txtNewSymbol) {
            btnAddModal.addEventListener('click', () => {
                txtNewSymbol.focus();
            });
        }
    }, []);

    return (
        <>
            <div className="card bg-neutral shadow-xl card-margin">
                <div className="card-body">
                    <span className="text-2xl">{watchlist.name}
                        <label htmlFor="edit-modal" className="btn btn-secondary btn-sm button-margin float-right">Edit</label>
                        <label id="btn-add-modal" htmlFor="add-modal" className="btn btn-primary btn-sm button-margin float-right">Add Symbol</label>
                    </span>
                    <div className="grid grid-cols-2 gap-1">
                        {watchlist.symbolArray.map((symbol: string) => (
                            <StockCard key={symbol} symbol={symbol} removeSymbol={removeSymbol}></StockCard>
                        ))}
                    </div>
                </div>
            </div>

            <input type="checkbox" id="add-modal" className="modal-toggle" />
            <label htmlFor="add-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Add symbol</h3>
                    <form>
                        <input id="txtNewSymbol" type="text" onChange={(e) => setNewSymbol(e.target.value)} className="input input-bordered w-full" placeholder="Symbol" />
                        <label className="label">
                            <span className="label-text-alt">Hint: Add multiple by separating with a comma</span>
                        </label>
                    </form>
                    <div className="modal-action">
                        <label htmlFor="add-modal" onClick={() => addSymbol(newSymbol)} className="btn">Save</label>
                    </div>
                </label>
            </label>
        </>
    );
}