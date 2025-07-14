import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, CircularProgress } from '@mui/material';
import { stringAvatar } from '../../utils/avatarUtils';
import { Dot, Send, Wifi, WifiOff } from 'lucide-react';
import { recupererConversations, recupererMessages, envoyerMessage, marquerMessageCommeLu } from '../../Services/MessagingService';
import signalRService from '../../Services/SignalRService';
import '../../assets/styles/common/Messaging.css';

export default function ChatUi() {
    const selectedConversationRef = useRef(null);

    const location = useLocation();
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    
    // Récupération des données envoyées via la navigation
    const navigationData = location.state || {};
    const { conversationId, userId, userName } = navigationData;
    
    // State pour les conversations récupérées du serveur
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State pour les messages de la conversation sélectionnée
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    // State to track the currently selected conversation
    const [selectedConversation, setSelectedConversation] = useState(null);

    // State to track the current message being typed in the input field.
    const [inputMessage, setInputMessage] = useState('');

    // State to track the search term used to filter the user list.
    const [searchTerm, setSearchTerm] = useState('');

    // State pour gérer l'envoi de message
    const [sendingMessage, setSendingMessage] = useState(false);

    // State pour SignalR
    const [signalRConnected, setSignalRConnected] = useState(false);
    const [typingUsers, setTypingUsers] = useState(new Map()); // Map<conversationId, userId>

    // Log pour vérifier les données reçues
    useEffect(() => {
        if (conversationId || userId || userName) {
            console.log('Données reçues de la navigation:', {
                conversationId,
                userId,
                userName
            });
        }
    }, [conversationId, userId, userName]);

    useEffect(() => {
    selectedConversationRef.current = selectedConversation;
}, [selectedConversation]);

    useEffect(() => {
        // Marquer automatiquement les messages comme lus si on est dans la conversation active
        if (selectedConversation && messages.length > 0) {
            const unreadMessages = messages.filter(msg => !msg.estDeMoi && !msg.estLu);
            if (unreadMessages.length > 0) {
                markMessagesAsRead(selectedConversation.id);
            }
        }
    }, [messages, selectedConversation]);

    // Initialisation de SignalR
    useEffect(() => {
        const initSignalR = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('⚠️ No auth token found for SignalR');
                    return;
                }

                await signalRService.startConnection(token);
                setSignalRConnected(true);

                // Configurer les event listeners
                setupSignalRListeners();
            } catch (error) {
                console.error('❌ Failed to initialize SignalR:', error);
                setSignalRConnected(false);
            }
        };

        initSignalR();

        // Cleanup
        return () => {
            signalRService.stopConnection();
        };
    }, []);

    // Configuration des listeners SignalR
    const setupSignalRListeners = () => {
        // Réception d'un nouveau message
// Listener messageReceived modifié pour éviter la duplication
    signalRService.on('messageReceived', (messageData) => {
        console.log('📨 Message reçu via SignalR:', messageData);
        const currentSelectedConv = selectedConversationRef.current; 
        const currentUserId = getCurrentUserId();
        
        const newMessage = {
            id: messageData.Id || messageData.id,
            contenu: messageData.Contenu || messageData.contenu,
            dateEnvoi: messageData.DateEnvoi || messageData.dateEnvoi,
            estLu: messageData.EstLu || messageData.estLu,
            expediteur: messageData.Expediteur || messageData.expediteur,
            estDeMoi: (messageData.Expediteur?.id || messageData.expediteur?.id) === currentUserId
        };

        const messageConversationId = messageData.ConversationId || messageData.conversationId;

        // Si c'est un message de l'utilisateur actuel, remplacer le message temporaire
        if (newMessage.estDeMoi) {
            setMessages(prev => {
                const tempMessageIndex = prev.findLastIndex(msg => 
                    msg.isTemporary && msg.contenu === newMessage.contenu
                );
                
                if (tempMessageIndex !== -1) {
                    const newMessages = [...prev];
                    newMessages[tempMessageIndex] = newMessage;
                    return newMessages;
                } else {
                    const messageExists = prev.some(msg => msg.id === newMessage.id);
                    if (!messageExists) {
                        return [...prev, newMessage];
                    }
                    return prev;
                }
            });
        } else {
            // Message d'un autre utilisateur
            if (currentSelectedConv && messageConversationId === currentSelectedConv.id) {
                setMessages(prev => {
                    const messageExists = prev.some(msg => msg.id === newMessage.id);
                    if (messageExists) {
                        return prev;
                    }
                    return [...prev, newMessage];
                });
                
                // NOUVEAU: Marquer automatiquement comme lu si on est dans la conversation
                setTimeout(() => {
                    markMessagesAsRead(messageConversationId);
                }, 500); // Petit délai pour s'assurer que le message est bien ajouté
            }
        }
        
        // Mettre à jour la liste des conversations
        setConversations(prev => prev.map(conv => {
            if (conv.id === messageConversationId) {
                // Si on est dans la conversation active, ne pas incrémenter les non lus
                const shouldIncrementUnread = !newMessage.estDeMoi && 
                    (!currentSelectedConv || currentSelectedConv.id !== messageConversationId);
                
                return {
                    ...conv,
                    dernierMessage: newMessage.contenu,
                    dateDernierMessage: newMessage.dateEnvoi,
                    messagesNonLus: shouldIncrementUnread 
                        ? (conv.messagesNonLus || 0) + 1 
                        : conv.messagesNonLus || 0
                };
            }
            return conv;
        }));
    });

// Function to handle sending a new message to the selected conversation.
const handleSend = async () => {
    if (!inputMessage.trim() || !selectedConversation || sendingMessage) return;

    const messageContent = inputMessage.trim();
    const currentUserId = getCurrentUserId();
    
    // Arrêter l'indicateur de frappe
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }
    if (signalRConnected) {
        signalRService.stopTyping(selectedConversation.id);
    }

    // Clear the input field immediately
    setInputMessage('');

    try {
        setSendingMessage(true);
        
        // Créer un ID temporaire unique
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        
        // Créer le message temporaire AVANT l'envoi
        const tempMessage = {
            id: tempId,
            contenu: messageContent,
            dateEnvoi: new Date().toISOString(),
            estDeMoi: true,
            expediteur: {
                Id: currentUserId,
            },
            estLu: false,
            dateLecture: null,
            isTemporary: true
        };

        // Ajouter le message temporaire IMMÉDIATEMENT
        setMessages(prev => [...prev, tempMessage]);

        // Mettre à jour la conversation avec le dernier message
        setConversations(prev => prev.map(conv => 
            conv.id === selectedConversation.id 
                ? {
                    ...conv,
                    dernierMessage: messageContent,
                    dateDernierMessage: tempMessage.dateEnvoi
                }
                : conv
        ));
        
        if (signalRConnected) {
            // Envoyer via SignalR
            await signalRService.sendMessage(
                selectedConversation.id, 
                messageContent, 
                selectedConversation.autreUtilisateur.id
            );
            
            // Le message temporaire sera remplacé par le vrai message
            // quand on recevra messageReceived
            
        } else {
            // Fallback vers l'API REST
            const result = await envoyerMessage(selectedConversation.id, messageContent);
            
            if (result.success) {
                // Remplacer le message temporaire par le message réel
                setMessages(prev => prev.map(msg => 
                    msg.id === tempId ? {
                        ...result.data,
                        estDeMoi: true
                    } : msg
                ));
                
                // Mettre à jour avec les vraies données du serveur
                setConversations(prev => prev.map(conv => 
                    conv.id === selectedConversation.id 
                        ? {
                            ...conv,
                            dernierMessage: messageContent,
                            dateDernierMessage: result.data.dateEnvoi
                        }
                        : conv
                ));
            } else {
                // Supprimer le message temporaire en cas d'erreur
                setMessages(prev => prev.filter(msg => msg.id !== tempId));
                // Remettre le texte dans l'input
                setInputMessage(messageContent);
                console.error('Erreur envoi message:', result.error);
            }
        }
    } catch (err) {
        console.error('Erreur inattendue envoi message:', err);
        // Supprimer le message temporaire en cas d'erreur
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
        // Remettre le texte dans l'input
        setInputMessage(messageContent);
    } finally {
        setSendingMessage(false);
    }
};
        // Message marqué comme lu
        signalRService.on('messageRead', (data) => {
            console.log('✅ Message marqué comme lu:', data);
            setMessages(prev => prev.map(msg => 
                msg.id === data.MessageId 
                    ? { ...msg, estLu: true, dateLecture: data.ReadAt }
                    : msg
            ));
        });

        // Changement de statut utilisateur
        signalRService.on('userStatusChanged', (data) => {
            console.log('👤 Statut utilisateur changé:', data);
            setConversations(prev => prev.map(conv => 
                conv.autreUtilisateur.id === data.UserId
                    ? { ...conv, autreUtilisateur: { ...conv.autreUtilisateur, estEnLigne: data.IsOnline }}
                    : conv
            ));

            // Mettre à jour la conversation sélectionnée
            if (selectedConversation && selectedConversation.autreUtilisateur.id === data.UserId) {
                setSelectedConversation(prev => ({
                    ...prev,
                    autreUtilisateur: { ...prev.autreUtilisateur, estEnLigne: data.IsOnline }
                }));
            }
        });

        // Utilisateur en train de taper
        signalRService.on('userTyping', (data) => {
            setTypingUsers(prev => new Map(prev.set(data.ConversationId, data.UserId)));
            
            // Arrêter l'indicateur après quelques secondes
            setTimeout(() => {
                setTypingUsers(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(data.ConversationId);
                    return newMap;
                });
            }, 3000);
        });

        // Utilisateur a arrêté de taper
        signalRService.on('userStoppedTyping', (data) => {
            setTypingUsers(prev => {
                const newMap = new Map(prev);
                newMap.delete(data.ConversationId);
                return newMap;
            });
        });

        // Erreurs SignalR
        signalRService.on('error', (error) => {
            console.error('❌ SignalR Error:', error);
            // Vous pouvez afficher une notification d'erreur ici
        });

        // État de connexion
        signalRService.on('connectionClosed', () => {
            setSignalRConnected(false);
        });

        signalRService.on('reconnected', () => {
            setSignalRConnected(true);
            // Rejoindre la conversation active si elle existe
            if (selectedConversation) {
                signalRService.joinConversation(selectedConversation.id);
            }
        });
    };

    // Obtenir l'ID de l'utilisateur courant (à adapter selon votre système d'auth)
    const getCurrentUserId = () => {
      
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return parseInt(payload.nameid);
            } catch (error) {
                console.error('Error parsing token:', error);
            }
        }
        return null;
    };

    // Function to truncate a message to a specified size and append "..." if it exceeds the size.
    function truncateMessage(text, size) {
        if (text.length > size) {
            return text.slice(0, size) + '...';
        }
        return text;
    }

    // Effect pour récupérer les conversations au chargement
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true);
                const result = await recupererConversations();
                
                if (result.success) {
                    const conversationsData = result.data.$values || [];
                    setConversations(conversationsData);
                    
                    // Si on a des données de navigation, sélectionner la conversation correspondante
                    if (userId) {
                        const targetConversation = conversationsData.find(
                            conv => conv.autreUtilisateur.id === userId
                        );
                        if (targetConversation) {
                            setSelectedConversation(targetConversation);
                        }
                    }
                } else {
                    setError(result.error || 'Erreur lors de la récupération des conversations');
                }
            } catch (err) {
                setError('Une erreur inattendue s\'est produite');
                console.error('Erreur fetchConversations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [userId]);

    // Effect pour ajouter une nouvelle conversation si elle n'existe pas (depuis navigation)
    useEffect(() => {
        if (userName && userId && conversationId && !loading) {
            const existingConversation = conversations.find(
                conv => conv.autreUtilisateur.id === userId
            );
            
            if (!existingConversation) {
                // Créer une nouvelle conversation temporaire
                const newConversation = {
                    id: conversationId,
                    dateCreation: new Date().toISOString(),
                    dateDernierMessage: null,
                    dernierMessage: "",
                    autreUtilisateur: {
                        id: userId,
                        nom: userName.split(' ')[0] || userName,
                        prenom: userName.split(' ')[1] || '',
                        avatarUrl: null,
                        estEnLigne: true
                    },
                    messagesNonLus: 0
                };
                
                setConversations(prev => [newConversation, ...prev]);
                setSelectedConversation(newConversation);
            }
        }
    }, [userName, userId, conversationId, conversations, loading]);

    // Effect pour récupérer les messages quand une conversation est sélectionnée
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConversation) {
                setMessages([]);
                return;
            }

            try {
                setMessagesLoading(true);
                setMessagesError(null);
                const result = await recupererMessages(selectedConversation.id);
                
                if (result.success) {
                    const messagesData = result.data.$values || [];
                    // Trier les messages par date d'envoi (plus ancien au plus récent)
                    const sortedMessages = messagesData.sort((a, b) => 
                        new Date(a.dateEnvoi) - new Date(b.dateEnvoi)
                    );
                    setMessages(sortedMessages);
                    
                    // Marquer les messages comme lus si la conversation a des messages non lus
                    if (selectedConversation.messagesNonLus > 0) {
                        markMessagesAsRead(selectedConversation.id);
                    }

                    // Rejoindre la conversation dans SignalR
                    if (signalRConnected) {
                        await signalRService.joinConversation(selectedConversation.id);
                    }
                } else {
                    setMessagesError(result.error || 'Erreur lors de la récupération des messages');
                    setMessages([]);
                }
            } catch (err) {
                setMessagesError('Une erreur inattendue s\'est produite');
                setMessages([]);
                console.error('Erreur fetchMessages:', err);
            } finally {
                setMessagesLoading(false);
            }
        };

        fetchMessages();

        // Cleanup: quitter la conversation précédente
        return () => {
            if (selectedConversation && signalRConnected) {
                signalRService.leaveConversation(selectedConversation.id);
            }
        };
    }, [selectedConversation, signalRConnected]);

    // Function pour marquer les messages comme lus
    const markMessagesAsRead = async (conversationId) => {
        try {
            const result = await marquerMessageCommeLu(conversationId);
            
            if (result.success) {
                // Mettre à jour le compteur de messages non lus dans la liste des conversations
                setConversations(prev => prev.map(conv => 
                    conv.id === conversationId 
                        ? { ...conv, messagesNonLus: 0 }
                        : conv
                ));
                
                // Mettre à jour la conversation sélectionnée
                setSelectedConversation(prev => 
                    prev ? { ...prev, messagesNonLus: 0 } : prev
                );
                
                console.log('Messages marqués comme lus avec succès');
            } else {
                console.error('Erreur lors du marquage comme lu:', result.error);
            }
        } catch (err) {
            console.error('Erreur inattendue lors du marquage comme lu:', err);
        }
    };

    // Effect pour scroller vers le bas quand de nouveaux messages arrivent
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function pour scroller vers le bas
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Function pour obtenir le nom complet de l'utilisateur
    const getUserFullName = (user) => {
        return `${user.nom} ${user.prenom}`.trim();
    };

    // Function pour formater la date/heure
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Function pour formater la date des messages
    const formatMessageTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        if (messageDate.getTime() === today.getTime()) {
            // Aujourd'hui, afficher seulement l'heure
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            // Autre jour, afficher la date et l'heure
            return date.toLocaleDateString([], { 
                day: '2-digit', 
                month: '2-digit',
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    };

    // Function to count unread messages for a conversation
    const getUnreadCount = (conversation) => {
        return conversation.messagesNonLus || 0;
    };

    // Function to handle conversation selection
    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation);
    };

    // Filtered list of conversations based on the search term.
    const filteredConversations = conversations.filter(conversation => {
        const fullName = getUserFullName(conversation.autreUtilisateur);
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Gestion de la frappe dans l'input
// Dans ChatUi.js, remplacez la fonction handleInputChange :
const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputMessage(newValue);
    
    // Gérer l'indicateur de frappe seulement si il y a du contenu
    if (selectedConversation && signalRConnected) {
        if (newValue.trim()) {
            // Commencer à taper
            signalRService.startTyping(selectedConversation.id);
            
            // Prolonger l'indicateur à chaque caractère tapé
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            
            typingTimeoutRef.current = setTimeout(() => {
                signalRService.stopTyping(selectedConversation.id);
            }, 1000);
        } else {
            // Si l'input est vide, arrêter immédiatement
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            signalRService.stopTyping(selectedConversation.id);
        }
    }
};

    // Function to handle sending a new message to the selected conversation.
// Function to handle sending a new message to the selected conversation.
const handleSend = async () => {
    if (!inputMessage.trim() || !selectedConversation || sendingMessage) return;

    const messageContent = inputMessage.trim();
    const currentUserId = getCurrentUserId();
    
    // Arrêter l'indicateur de frappe
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }
    if (signalRConnected) {
        signalRService.stopTyping(selectedConversation.id);
    }

    // Clear the input field immediately
    setInputMessage('');

    try {
        setSendingMessage(true);
        
        // Créer un ID temporaire unique
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        
        // Créer le message temporaire AVANT l'envoi
        const tempMessage = {
            id: tempId,
            contenu: messageContent,
            dateEnvoi: new Date().toISOString(),
            estDeMoi: true,
            expediteur: {
                Id: currentUserId,
            },
            estLu: false,
            dateLecture: null,
            isTemporary: true
        };

        // Ajouter le message temporaire IMMÉDIATEMENT
        setMessages(prev => [...prev, tempMessage]);

        // Mettre à jour la conversation avec le dernier message
        setConversations(prev => prev.map(conv => 
            conv.id === selectedConversation.id 
                ? {
                    ...conv,
                    dernierMessage: messageContent,
                    dateDernierMessage: tempMessage.dateEnvoi
                }
                : conv
        ));
        
        if (signalRConnected) {
            // Envoyer via SignalR
            await signalRService.sendMessage(
                selectedConversation.id, 
                messageContent, 
                selectedConversation.autreUtilisateur.id
            );
            
            // IMPORTANT: Ne pas supprimer le message temporaire ici
            // Il sera remplacé quand on recevra la confirmation du serveur
            // via messageReceived (pour les autres) ou une autre méthode
            
        } else {
            // Fallback vers l'API REST
            const result = await envoyerMessage(selectedConversation.id, messageContent);
            
            if (result.success) {
                // Remplacer le message temporaire par le message réel
                setMessages(prev => prev.map(msg => 
                    msg.id === tempId ? {
                        ...result.data,
                        estDeMoi: true
                    } : msg
                ));
                
                // Mettre à jour avec les vraies données du serveur
                setConversations(prev => prev.map(conv => 
                    conv.id === selectedConversation.id 
                        ? {
                            ...conv,
                            dernierMessage: messageContent,
                            dateDernierMessage: result.data.dateEnvoi
                        }
                        : conv
                ));
            } else {
                // Supprimer le message temporaire en cas d'erreur
                setMessages(prev => prev.filter(msg => msg.id !== tempId));
                // Remettre le texte dans l'input
                setInputMessage(messageContent);
                console.error('Erreur envoi message:', result.error);
            }
        }
    } catch (err) {
        console.error('Erreur inattendue envoi message:', err);
        // Supprimer le message temporaire en cas d'erreur
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
        // Remettre le texte dans l'input
        setInputMessage(messageContent);
    } finally {
        setSendingMessage(false);
    }
};


    // Function to render unread indicator
    const renderUnreadIndicator = (conversation) => {
        const unreadCount = getUnreadCount(conversation);
        
        if (unreadCount === 0) {
            return null;
        } else if (unreadCount === 1) {
            return (
                <div className="unread">
                    <Dot className='dot' size={20} strokeWidth={10} />
                </div>
            );
        } else {
            return (
                <div className="unread has-count">
                    <div className={`unread-count ${unreadCount > 99 ? 'large-count' : ''}`}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                </div>
            );
        }
    };

    // Function pour afficher l'indicateur "en train de taper"
    const renderTypingIndicator = () => {
        if (!selectedConversation) return null;
        
        const isTyping = typingUsers.has(selectedConversation.id);
        
        if (isTyping) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginBottom: '12px',
                    paddingRight: '20%'
                }}>
                    <div style={{
                        backgroundColor: '#f1f1f1',
                        color: '#666',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        fontSize: '0.9em',
                        fontStyle: 'italic'
                    }}>
                        {getUserFullName(selectedConversation.autreUtilisateur)} est en train de taper...
                    </div>
                </div>
            );
        }
        
        return null;
    };

    // Function pour rendre un message
    const renderMessage = (message) => {
        const isFromMe = message.estDeMoi;
        console.log('Rendu du message:', message);
        
        return (
            <div
                key={message.id}
                style={{
                    display: 'flex',
                    justifyContent: isFromMe ? 'flex-end' : 'flex-start',
                    marginBottom: '12px',
                    paddingLeft: isFromMe ? '20%' : '0',
                    paddingRight: isFromMe ? '0' : '20%'
                }}
            >
                <div
                    style={{
                        backgroundColor: isFromMe ? 'hsl(6 100% 72%)' : '#f1f1f1',
                        color: isFromMe ? 'white' : 'black',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        maxWidth: '100%',
                        wordWrap: 'break-word',
                        position: 'relative'
                    }}
                >
                    <div>{message.contenu}</div>
                    <div
                        style={{
                            fontSize: '0.7em',
                            opacity: 0.7,
                            marginTop: '4px',
                            textAlign: 'right'
                        }}
                    >
                        {formatMessageTime(message.dateEnvoi)}
                        {isFromMe && (
                            <span style={{ marginLeft: '4px' }}>
                                {message.estLu ? '✓✓' : '✓'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Affichage du loading
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <CircularProgress />
            </div>
        );
    }

    // Affichage de l'erreur
    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                color: '#666'
            }}>
                <p>Erreur: {error}</p>
                <button onClick={() => window.location.reload()}>Réessayer</button>
            </div>
        );
    }

    return (
        <div className="chat-ui" style={{ display: 'flex' }}>
            {/* Left Section: List of users */}
            <div className="all-messages" style={{ width: '30%', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
                {/* Header avec indicateur de connexion SignalR */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    borderBottom: '1px solid #eee'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.1em' }}>Messages</h3>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px',
                        fontSize: '0.8em',
                        color: signalRConnected ? '#4CAF50' : '#f44336'
                    }}>
                        {signalRConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
                        {signalRConnected ? 'En ligne' : 'Hors ligne'}
                    </div>
                </div>

                {/* Search input for filtering users */}
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '90%',
                        padding: '10px',
                        boxSizing: 'border-box',
                        borderRadius: '8px ',
                        marginBottom: '10px',
                        zIndex: 133,
                        marginTop: '20px',
                        position: 'sticky',
                        border: '1px solid gray',
                        marginLeft: '5%',
                    }}
                />
                {/* List of conversations */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filteredConversations.length === 0 ? (
                        <div style={{ 
                            textAlign: 'center', 
                            color: '#666', 
                            marginTop: '50px',
                            padding: '20px'
                        }}>
                            {searchTerm ? 'Aucune conversation trouvée' : 'Aucune conversation'}
                        </div>
                    ) : (
                        filteredConversations.map(conversation => {
                            const fullName = getUserFullName(conversation.autreUtilisateur);
                            const isOnline = conversation.autreUtilisateur.estEnLigne;
                            const lastMessageTime = formatTime(conversation.dateDernierMessage);
                            
                            return (
                                <div
                                    className="message"
                                    key={conversation.id}
                                    onClick={() => handleConversationSelect(conversation)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        background: selectedConversation?.id === conversation.id ? 'hsl(210deg 40% 96.1% / 50%)' : '#fff',
                                        borderBottom: '1px solid #ccc',
                                        transition: 'background 0.3s',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    {/* User avatar with online/offline status */}
                                    <div style={{ position: 'relative' }}>
                                        <Avatar {...stringAvatar(fullName)} />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: isOnline ? 'rgb(34 197 94)' : 'gray',
                                                border: '2px solid white',
                                            }}
                                        ></span>
                                    </div>
                                    {/* User details: name, last message, and timestamp */}
                                    <div className="content" style={{ marginLeft: 10, flexGrow: 1 }}>
                                        <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="name" style={{ fontWeight: 600 }}>{fullName}</div>
                                            <div className="time" style={{ fontSize: '0.8em', color: '#666' }}>
                                                {lastMessageTime}
                                            </div>
                                        </div>
                                        <div className="text" style={{ fontSize: '0.9em' }}>
                                            {truncateMessage(conversation.dernierMessage || 'Pas de messages', 40)}
                                        </div>
                                    </div>
                                    {/* Unread message indicator */}
                                    {renderUnreadIndicator(conversation)}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Right Section: Conversation area */}
            <div className="chat-content" style={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
                {selectedConversation ? (
                    <>
                        {/* Chat header: Selected user's name and status */}
                        <div className="chat-header" style={{ 
                            fontWeight: 600, 
                            fontSize: '1.2em', 
                            padding: '15px', 
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{ position: 'relative', marginRight: '10px' }}>
                                <Avatar {...stringAvatar(getUserFullName(selectedConversation.autreUtilisateur))} />
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: selectedConversation.autreUtilisateur.estEnLigne ? 'rgb(34 197 94)' : 'gray',
                                        border: '2px solid white',
                                    }}
                                ></span>
                            </div>
                            <div className="name">{getUserFullName(selectedConversation.autreUtilisateur)}</div>
                        </div>

                      

                        {/* Chat messages */}
                  <div className="chat-messages" style={{ 
                        flex: 1, 
                        overflowY: 'auto', 
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {messagesLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <CircularProgress size={30} />
                            </div>
                        ) : messagesError ? (
                            <div style={{ textAlign: 'center', color: '#f44336', marginTop: 20 }}>
                                Erreur: {messagesError}
                            </div>
                        ) : messages.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
                                Aucun message dans cette conversation
                            </div>
                        ) : (
                            <>
                                {messages.map(message => renderMessage(message))}
                                {/* AJOUTEZ CETTE LIGNE - Indicateur de frappe */}
                                {renderTypingIndicator()}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                        {/* Message input and send button */}
                        <div className="chat-conversation" style={{ 
                            display: 'flex', 
                            gap: 10, 
                            padding: '15px',
                            borderTop: '1px solid #ccc'
                        }}>
                            <input
                                type="text"
                                placeholder="Entre ton message..."
                                value={inputMessage}
                                onChange={handleInputChange} // CHANGÉ : utilisez handleInputChange au lieu de (e) => setInputMessage(e.target.value)
                                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                disabled={sendingMessage}
                                style={{
                                    flexGrow: 1,
                                    padding: 10,
                                    border: '1px solid #ccc',
                                    borderRadius: 8,
                                    opacity: sendingMessage ? 0.7 : 1
                                }}
                            />
                            <button
                                type="submit"
                                onClick={handleSend}
                                disabled={!inputMessage.trim() || sendingMessage}
                                style={{
                                    backgroundColor: (inputMessage.trim() && !sendingMessage) ? 'hsl(6 100% 72%)' : 'hsl(6 100% 72% / 50%)',
                                    color: '#fff',
                                    padding: '10px ',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: (inputMessage.trim() && !sendingMessage) ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                {sendingMessage ? (
                                    <CircularProgress size={16} style={{ color: 'white' }} />
                                ) : (
                                    <Send size={16} />
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    // Placeholder when no conversation is selected
                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        color: '#888'
                    }}>
                        <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>💬</div>
                        <div>Sélectionner une conversation pour commencer à chatter</div>
                    </div>
                )}
            </div>
        </div>
    );
}