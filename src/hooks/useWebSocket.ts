import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
    const socket = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            setIsConnected(true);
        };

        socket.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        socket.current.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [url]);

    const sendMessage = (message: string) => {
        if (socket.current && isConnected) {
            socket.current.send(message);
        }
    };

    return {
        messages,
        isConnected,
        sendMessage,
    };
};

export default useWebSocket;
