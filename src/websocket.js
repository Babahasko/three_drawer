// Создаем объект WebSocket
const socket = new WebSocket("ws://localhost:8765");

// Функция для отправки данных на сервер (если нужно)
function sendWebSocketMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        console.log("Websocet open")
        socket.send(JSON.stringify(message));
    } else {
        console.error("WebSocket не готов для отправки сообщений.");
    }
}

// Экспортируем функции и события WebSocket
export const webSocketManager = {
    onOpen: (callback) => {
        socket.addEventListener("open", callback);
    },
    onClose: (callback) => {
        socket.addEventListener("close", callback);
    },
    onError: (callback) => {
        socket.addEventListener("error", (error) => {
            console.error("Ошибка WebSocket:", error);
            callback(error);
        });
    },
    onMessage: (callback) => {
        socket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);
                callback(data);
            } catch (error) {
                console.error("Ошибка при парсинге данных:", error);
            }
        });
    },
    sendMessage: (message) => {
        sendWebSocketMessage(message);
    },
};