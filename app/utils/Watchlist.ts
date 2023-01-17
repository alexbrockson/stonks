import Stock from "./Stock"

export default interface Watchlist {
    id?: string | null    
    name?: string | null
    created?: Date
    stocks?: string
    symbolArray?: string[]
    stocksObjectArray?: Stock[]
}