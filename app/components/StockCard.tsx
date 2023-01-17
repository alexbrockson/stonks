'use client';
import Stock from "../utils/Stock";
import { useEffect, useState } from "react";
import { GetQuote } from "../utils/Finnhub";

type Props = { symbol: string, removeSymbol: any }

export default function StockCard({ symbol, removeSymbol }: Props) {

    const [data, setData] = useState<any>(null);

    useEffect(() => {    
        const getQuote = async (symbol: string) => {
            const data = await GetQuote(symbol)
            if (data) {
                setData(data);
                let stock = new Stock;
                stock = {
                    symbol: symbol,
                    c: data['c'],
                    d: data['d'],
                    dp: data['dp'],
                    h: data['h'],
                    l: data['l'],
                    o: data['o'],
                    pc: data['pc']
                }
                setData(stock);
            }
        };
        // setTimeout(() => {
            getQuote(symbol);
        // }, 1000);
    }, [])



    return (
        <>
            {data && (
                <div className="card w-45 bg-primary-content shadow-xl card-margin">
                    <div className="card-body">
                        <span className="card-title">{data.symbol} {`$${data.c}`}</span>
                        {
                            data && (
                                data.d > 0 ? (
                                    <p>
                                        <span>Change: </span>
                                        <span className="positive">{`+${data.d}`} {`(${data.dp!.toFixed(2) + '%'})`}</span>
                                    </p>
                                ) : (
                                    <p>
                                        <span>Change: </span>
                                        <span className="negative">{`${data.d}`} {`(${data.dp!.toFixed(2) + '%'})`}</span>
                                    </p>
                                )
                            )
                        }
                        <p>High: ${data.h}</p>
                        <p>Low: ${data.l}</p>
                        <p>Open: ${data.o}</p>
                        <p>Previous Close: ${data.pc}</p>
                    </div>
                    {
                        <>
                            <button className="btn btn-circle btn-outline stock-delete" onClick={() => removeSymbol(data.symbol)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </>
                    }
                </div>
            )}
        </>
    );
}