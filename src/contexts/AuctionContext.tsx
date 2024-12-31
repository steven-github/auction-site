import React, { ReactNode, createContext, useContext, useState } from "react";

interface Auction {
    id: string;
    title: string;
    description: string;
    currentBid: number;
    endTime: string;
}

interface AuctionContextType {
    auctions: Auction[];
    setAuctions: (auctions: Auction[]) => void;
    selectedAuction: Auction | null;
    setSelectedAuction: (auction: Auction | null) => void;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);

    return <AuctionContext.Provider value={{ auctions, setAuctions, selectedAuction, setSelectedAuction }}>{children}</AuctionContext.Provider>;
};

export const useAuction = (): AuctionContextType => {
    const context = useContext(AuctionContext);
    if (!context) {
        throw new Error("useAuction must be used within an AuctionProvider");
    }
    return context;
};
