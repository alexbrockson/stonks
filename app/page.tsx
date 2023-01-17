'use client';


import { InsertWatchlist } from './utils/Supabase'
import { useState } from 'react';
import Alert from './components/alert';
import Image from 'next/image';

export default function Home() {

  const [data, setData] = useState<any>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [showImage, setShowImage] = useState(false);

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length && symbol.length) {
      let payload = {
        name: name,
        stocks: symbol.toUpperCase().trim()
      }

      const { data, error } = await InsertWatchlist(payload);
      if (error) {
        console.log('error', error);
        setAlertMessage(error.message);
        setAlertType('error');
      }
      else {
        if (data) {
          setData(data);
          setAlertMessage('Watchlist created!');
          setAlertType('success');
          setShowImage(true);
          // redirect to watchlist page after 2 seconds
          setTimeout(() => {
            window.location.href = `/watchlists/${data.name}`;
          }, 2000);
        }
      }
    }
  }

  return (
    <>


      <div className="center">

        {
          alertMessage &&
          (
            <Alert message={alertMessage} type={alertType} />
          )
        }
        <form onSubmit={create}>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="name">
              <span className="label-text">Name your new watchlist</span>
            </label>         
            <input name="name" id="name" type="text" onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase())} value={name} className="input input-bordered w-full max-w-xs" />            
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="symbol">
              <span className="label-text">Add a symbol or two to start with</span>
            </label>
            <input name="symbol" id="symbol" type="text" onChange={(e) => setSymbol(e.target.value.toUpperCase())} value={symbol} className="input input-bordered w-full max-w-xs" />
          </div>
          <br/>
          <button className="btn btn-primary" type="submit">➕ Watchlist</button>
        </form>
        <br/>        
        {showImage && (
          <Image src="/stonks.jpg" alt="stonks" width="798" height="599" />
        )
        }
      </div>
    </>
  )
}
