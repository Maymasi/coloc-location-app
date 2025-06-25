// Services/SignalRService.js
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalRService {
    constructor() {
        this.connection = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.eventHandlers = new Map();
    }

    // Initialiser la connexion SignalR
    async startConnection(token) {
        try {
            this.connection = new HubConnectionBuilder()
                .withUrl('https://localhost:7174/chathub', {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: (retryContext) => {
                        if (retryContext.previousRetryCount < 4) {
                            return [0, 2000, 10000, 30000][retryContext.previousRetryCount];
                        }
                        return 30000;
                    }
                })
                .configureLogging(LogLevel.Information)
                .build();

            // Gérer les événements de connexion
            this.connection.onclose(this.handleConnectionClosed.bind(this));
            this.connection.onreconnecting(this.handleReconnecting.bind(this));
            this.connection.onreconnected(this.handleReconnected.bind(this));

            // Démarrer la connexion
            await this.connection.start();
            this.isConnected = true;
            this.reconnectAttempts = 0;
            
            console.log('✅ SignalR Connected');
            
            // Configurer les listeners par défaut
            this.setupDefaultListeners();
            
            return true;
        } catch (error) {
            console.error('❌ SignalR Connection Error:', error);
            this.isConnected = false;
            throw error;
        }
    }

    // Arrêter la connexion
    async stopConnection() {
        if (this.connection) {
            try {
                await this.connection.stop();
                this.isConnected = false;
                console.log('🔌 SignalR Disconnected');
            } catch (error) {
                console.error('❌ Error stopping SignalR connection:', error);
            }
        }
    }

    // Configurer les listeners par défaut
    setupDefaultListeners() {
        if (!this.connection) return;

        this.connection.on('ReceiveMessage', (messageData) => {
            console.log('📨 Message reçu via SignalR (brut):', messageData);
            this.emit('messageReceived', messageData);
        });

        // Message marqué comme lu - CORRIGÉ
        this.connection.on('MessageMarkedAsRead', (data) => {
            console.log('✅ Message marqué comme lu (brut):', data);
            this.emit('messageRead', data);
        });

        // Statut utilisateur changé - CORRIGÉ
        this.connection.on('UserOnlineStatusChanged', (data) => {
            console.log('👤 Statut utilisateur changé (brut):', data);
            this.emit('userStatusChanged', data);
        });

        // Utilisateur en train de taper - CORRIGÉ
        this.connection.on('UserIsTyping', (data) => {
            console.log('⌨️ Utilisateur en train de taper (brut):', data);
            this.emit('userTyping', data);
        });

        // Utilisateur a arrêté de taper - CORRIGÉ
        this.connection.on('UserStoppedTyping', (data) => {
            console.log('⏸️ Utilisateur a arrêté de taper (brut):', data);
            this.emit('userStoppedTyping', data);
        });

        // Erreur reçue du serveur
        this.connection.on('Error', (error) => {
            this.emit('error', error);
            console.error('❌ SignalR Server Error:', error);
        });
    }

    // Envoyer un message
    async sendMessage(conversationId, contenu, destinataireId) {
        if (!this.isConnected || !this.connection) {
            throw new Error('SignalR connection not established');
        }

        try {
            await this.connection.invoke('SendMessage', conversationId, contenu, destinataireId);
        } catch (error) {
            console.error('❌ Error sending message:', error);
            throw error;
        }
    }

    // Marquer un message comme lu
    async markMessageAsRead(messageId) {
        if (!this.isConnected || !this.connection) return;

        try {
            await this.connection.invoke('MarkMessageAsRead', messageId);
        } catch (error) {
            console.error('❌ Error marking message as read:', error);
        }
    }

    // Rejoindre une conversation
    async joinConversation(conversationId) {
        if (!this.isConnected || !this.connection) return;

        try {
            await this.connection.invoke('JoinConversation', conversationId);
            console.log(`📥 Joined conversation ${conversationId}`);
        } catch (error) {
            console.error('❌ Error joining conversation:', error);
        }
    }

    // Quitter une conversation
    async leaveConversation(conversationId) {
        if (!this.isConnected || !this.connection) return;

        try {
            await this.connection.invoke('LeaveConversation', conversationId);
            console.log(`📤 Left conversation ${conversationId}`);
        } catch (error) {
            console.error('❌ Error leaving conversation:', error);
        }
    }

    // Indiquer que l'utilisateur tape
    async startTyping(conversationId) {
        if (!this.isConnected || !this.connection) return;

        try {
            await this.connection.invoke('StartTyping', conversationId);
        } catch (error) {
            console.error('❌ Error starting typing indicator:', error);
        }
    }

    // Indiquer que l'utilisateur a arrêté de taper
    async stopTyping(conversationId) {
        if (!this.isConnected || !this.connection) return;

        try {
            await this.connection.invoke('StopTyping', conversationId);
        } catch (error) {
            console.error('❌ Error stopping typing indicator:', error);
        }
    }

    // Système d'événements personnalisé
    on(eventName, handler) {
        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, []);
        }
        this.eventHandlers.get(eventName).push(handler);
    }

    off(eventName, handler) {
        if (this.eventHandlers.has(eventName)) {
            const handlers = this.eventHandlers.get(eventName);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(eventName, data) {
        if (this.eventHandlers.has(eventName)) {
            this.eventHandlers.get(eventName).forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`❌ Error in event handler for ${eventName}:`, error);
                }
            });
        }
    }

    // Gestionnaires d'événements de connexion
    handleConnectionClosed(error) {
        this.isConnected = false;
        console.log('🔌 SignalR Connection Closed', error);
        this.emit('connectionClosed', error);
    }

    handleReconnecting(error) {
        console.log('🔄 SignalR Reconnecting...', error);
        this.emit('reconnecting', error);
    }

    handleReconnected(connectionId) {
        this.isConnected = true;
        console.log('✅ SignalR Reconnected', connectionId);
        this.emit('reconnected', connectionId);
    }

    // Vérifier l'état de la connexion
    getConnectionState() {
        if (!this.connection) return 'Disconnected';
        
        const states = {
            0: 'Disconnected',
            1: 'Connecting',
            2: 'Connected',
            4: 'Disconnecting',
            8: 'Reconnecting'
        };
        
        return states[this.connection.state] || 'Unknown';
    }

    // Obtenir l'ID de connexion
    getConnectionId() {
        return this.connection?.connectionId || null;
    }
}

// Créer une instance singleton
const signalRService = new SignalRService();
export default signalRService;