import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuthStore } from '@/stores/auth.js';

let stompClient = null;
let currentSubscription = null;
let currentRoomId = null;

export const connectStomp = (onConnectCallback) => {
    const socket = new SockJS('http://localhost:8080/ws-stomp');
    stompClient = Stomp.over(socket);
    const authStore = useAuthStore();

    stompClient.connect(
        {
            Authorization: `${authStore.accessToken}`,
        },
        () => {
            console.log('✅ STOMP connected');
            onConnectCallback?.();
        },
        (error) => {
            console.error('❌ STOMP connection error', error);
        }
    );
};

export const subscribeStomp = (onMessageCallback, chattingRoomId) => {
    const authStore = useAuthStore();

    if (chattingRoomId === currentRoomId) {
        console.log('ℹ️ Already subscribed to this room:', chattingRoomId);
        return;
    }

    // 이전 구독 해제
    if (currentSubscription) {
        currentSubscription.unsubscribe();
        console.log('🔄 Unsubscribed from previous room:', currentRoomId);
    }

    // 새로운 방 구독
    currentSubscription = stompClient.subscribe(
        `/topic/room/${chattingRoomId}`,
        (message) => {
            const payload = JSON.parse(message.body);
            onMessageCallback(payload);
        },
        {
            Authorization: `${authStore.accessToken}`,
        }
    );

    currentRoomId = chattingRoomId;
    console.log('📡 Subscribed to new room:', chattingRoomId);
};

export const sendMessage = (destination, messageObj) => {
    const authStore = useAuthStore();
    stompClient.send(
        destination,
        {
            Authorization: `${authStore.accessToken}`,
        },
        JSON.stringify(messageObj)
    );
};

export const disconnectStomp = () => {
    if (stompClient) {
        if (currentSubscription) {
            currentSubscription.unsubscribe();
            currentSubscription = null;
            currentRoomId = null;
        }
        stompClient.disconnect(() => {
            console.log('🔌 STOMP disconnected');
        });
    }
};
