"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type User } from "@/lib/auth";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    setUser(currentUser);

    // Add welcome message
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI assistant. I can help you find products, answer questions about our drinks, or provide recommendations. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [router]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response (placeholder for backend integration)
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("juice") || input.includes("orange")) {
      return "We have several refreshing juices! Our Fresh Orange Juice is cold-pressed and has no added sugar. We also have Apple Juice, Mango Juice, and Pineapple Juice. Which one interests you?";
    }

    if (input.includes("coffee") || input.includes("caffeine")) {
      return "For caffeine options, try our Cold Brew Coffee - smooth and low-acid. We also have Matcha Latte and Black Tea Lemonade. All are great energy boosters!";
    }

    if (input.includes("drink") || input.includes("soda")) {
      return "Our drinks section includes Sparkling Citrus Soda, Ginger Honey Fizz, Lime Tonic, and some hard options like Mojito and Negroni. What type are you in the mood for?";
    }

    if (input.includes("recommend") || input.includes("suggest")) {
      return "If you're looking for something refreshing, I'd recommend our Pineapple Juice. For energy, the Cold Brew Coffee is excellent. What occasion is this for?";
    }

    if (input.includes("price") || input.includes("cost")) {
      return "Our prices range from $2.49 for sodas up to $8.99 for premium cocktails. Most juices are around $4-6. Let me know what you're interested in!";
    }

    return "That's interesting! I'm here to help with product recommendations, answer questions about our drinks, or help you find what you're looking for. What can I assist you with today?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat with AI Assistant</h1>

      <div className="card p-6">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about products, get recommendations..."
            className="input-base flex-1"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="btn btn-primary disabled:opacity-50"
          >
            Send
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-2">
          Press Enter to send. Ask about juices, drinks, recommendations, or anything else!
        </p>
      </div>
    </div>
  );
}
