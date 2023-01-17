## What is Stonks?
Stonks is a fun little project I did over the weekend to further explore React. It is a simple application to create watchlists of stocks so that their up to date price information can be viewed in a convenient dashboard like interface. Up to date price information is pulled from [Finnhub.io](https://finnhub.io/).

## Getting Started

### 1. Install the required packages:

```bash
npm install
```

### 2. Setup Supabase

  ##### 2a. Rename .env.sample to .env.local

  ##### 2b. In .env.local, replace placholder values with the URL and keys provided

```bash
NEXT_PUBLIC_SUPABASE_URL=EnterURLHereNoQuotes
NEXT_PUBLIC_SUPABASE_ANON_KEY=EnterKeyHereNoQuotes
NEXT_PUBLIC_FINNHUB_KEY=EnterKeyHereNoQuotes
```

### 3. Run the server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## Demo

Check out a [demo](https://stonks.vercel.app/)!
