
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

// Sample data for demo
const conversations = [
  {
    id: "1",
    with: {
      id: "host1",
      name: "Marie Dupont",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    property: {
      id: "prop1",
      name: "Villa moderne vue sur mer",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop"
    },
    lastMessage: {
      text: "Bonjour Thomas ! Je voulais juste confirmer votre arrivée pour le 15 juin. Avez-vous besoin d'informations supplémentaires avant votre séjour ?",
      time: new Date(2025, 4, 28, 14, 35),
      isFromMe: false
    },
    unread: true
  },
  {
    id: "2",
    with: {
      id: "host2",
      name: "Laurent Martin",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
    },
    property: {
      id: "prop2",
      name: "Appartement élégant au centre-ville",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
    },
    lastMessage: {
      text: "Merci pour votre séjour chez nous ! N'hésitez pas à laisser un avis sur votre expérience.",
      time: new Date(2025, 1, 17, 10, 12),
      isFromMe: false
    },
    unread: false
  }
];

const messageHistory = [
  {
    id: "1",
    conversationId: "1",
    text: "Bonjour ! Je suis intéressé par votre villa pour un séjour du 15 au 22 juin. Est-elle toujours disponible ?",
    time: new Date(2025, 4, 26, 9, 23),
    isFromMe: true
  },
  {
    id: "2",
    conversationId: "1",
    text: "Bonjour Thomas ! Oui, la villa est disponible pour ces dates. C'est une période magnifique pour profiter de la vue sur mer.",
    time: new Date(2025, 4, 26, 10, 15),
    isFromMe: false
  },
  {
    id: "3",
    conversationId: "1",
    text: "Super ! Est-ce qu'il y a des commerces à proximité ? Je compte louer une voiture, y a-t-il un parking ?",
    time: new Date(2025, 4, 26, 11, 5),
    isFromMe: true
  },
  {
    id: "4",
    conversationId: "1",
    text: "Il y a un petit supermarché à 5 minutes à pied et plusieurs restaurants. Et oui, la villa dispose d'un parking privé pour 2 voitures. Vous aurez également accès à la piscine et au jardin privatifs.",
    time: new Date(2025, 4, 26, 13, 42),
    isFromMe: false
  },
  {
    id: "5",
    conversationId: "1",
    text: "Parfait, j'ai réservé pour ces dates. Merci pour vos réponses !",
    time: new Date(2025, 4, 27, 15, 20),
    isFromMe: true
  },
  {
    id: "6",
    conversationId: "1",
    text: "Bonjour Thomas ! Je voulais juste confirmer votre arrivée pour le 15 juin. Avez-vous besoin d'informations supplémentaires avant votre séjour ?",
    time: new Date(2025, 4, 28, 14, 35),
    isFromMe: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(
    messageHistory.filter(msg => msg.conversationId === conversations[0].id)
  );
  
  const handleSelectConversation = (conversation: typeof conversations[0]) => {
    setSelectedConversation(conversation);
    setMessages(messageHistory.filter(msg => msg.conversationId === conversation.id));
    
    // Mark as read
    if (conversation.unread) {
      const updatedConversations = conversations.map(conv => 
        conv.id === conversation.id ? { ...conv, unread: false } : conv
      );
      // In a real app, this would also update the backend
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    const newMsg = {
      id: `new-${Date.now()}`,
      conversationId: selectedConversation.id,
      text: newMessage.trim(),
      time: new Date(),
      isFromMe: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    toast.success("Message envoyé");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-300px)]">
          {/* Conversations List */}
          <div className="lg:w-1/3 h-full border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="font-semibold">Conversations</h2>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`w-full text-left p-4 border-b flex gap-3 hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.with.avatar} />
                      <AvatarFallback>{conversation.with.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.unread && (
                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-destructive"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium truncate">{conversation.with.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {format(conversation.lastMessage.time, "HH:mm", { locale: fr })}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage.isFromMe && "Vous: "}
                        {conversation.lastMessage.text}
                      </p>
                      
                      {conversation.unread && (
                        <Badge className="flex-shrink-0 text-xs h-5" variant="destructive">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      Re: {conversation.property.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Messages */}
          <div className="lg:w-2/3 h-full border rounded-lg overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.with.avatar} />
                    <AvatarFallback>
                      {selectedConversation.with.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h2 className="font-semibold">{selectedConversation.with.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.property.name}
                    </p>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${
                          message.isFromMe 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p className="break-words">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isFromMe ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {format(message.time, "HH:mm", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                  <Input
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Sélectionnez une conversation pour commencer
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
