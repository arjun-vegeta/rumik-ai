"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend, IoArrowRedo } from "react-icons/io5";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  timestamp?: string;
}

export default function TryIraEmbed() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "hey there! 👋 main ira!",
      id: "welcome-1",
      timestamp: "21:37"
    },
    {
      role: "assistant",
      content: "i'm basically your personal cheerleader with a side of honest opinions",
      id: "welcome-2",
      timestamp: "21:37"
    },
    {
      role: "assistant",
      content: "speak to me via text, images, voicenotes, stickers, emojis and call",
      id: "welcome-3",
      timestamp: "21:37"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessageCount = messages.filter((m: Message) => m.role === "user").length;
    if (userMessageCount >= 4) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: Date.now().toString(),
      timestamp: getCurrentTime()
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat-ira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      if (data.reply) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply.toLowerCase(), // Ira's style in the mockup is lowercase
          id: (Date.now() + 1).toString(),
          timestamp: getCurrentTime()
        };
        setMessages((prev: Message[]) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "sorry, i'm having trouble connecting right now. please try again! 🙏",
        id: (Date.now() + 1).toString(),
        timestamp: getCurrentTime()
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messageLimitReached = messages.filter((m: Message) => m.role === "user").length >= 4;

  return (
    <div className="flex flex-col h-full bg-[#FAF1E8]/41 rounded-[40px] overflow-hidden relative max-w-[420px] min-w-[320px] mx-auto aspect-[9/19.5] overflow-x-hidden">
      {/* iPhone Status Bar */}
      <div className="h-14 px-8 flex items-center justify-between bg-transparent z-10">
        <Image src="/svgs/Left Side.svg" alt="Status Left" width={54} height={21} />
        <Image src="/svgs/Right Side.svg" alt="Status Right" width={67} height={14} />
      </div>

      {/* Pill Header */}
      <div className="px-4 py-2 z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-100 shrink-0">
              <Image 
                src="/ira-dp.jpeg" 
                alt="Ira" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-black text-xl leading-tight" style={{ fontFamily: 'var(--font-young-serif), serif' }}>ira</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-[10px] text-green-600 font-medium">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:scale-105 transition-transform">
              <Image src="/svgs/Mask group.png" alt="Rumik Star" width={24} height={24} />
            </button>
            <button className="hover:scale-105 transition-transform">
              <Image src="/svgs/ion_call.svg" alt="Call" width={22} height={22} />
            </button>
            <button className="hover:scale-105 transition-transform">
              <Image src="/svgs/lets-icons_meatballs-menu.svg" alt="More" width={24} height={24} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 ira-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((message: Message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-1 max-w-[85%]">
                <div
                  className={`px-4 py-2.5 shadow-sm relative ${
                    message.role === "user"
                      ? "bg-[#F6EBCC] text-black rounded-2xl rounded-tr-none"
                      : "bg-white text-black rounded-2xl rounded-tl-none"
                  }`}
                >
                  <span className="text-[15px] leading-relaxed pr-8 inline-block">{message.content}</span>
                  <span className="text-[10px] text-gray-400 absolute right-2 bottom-1.5">{message.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start px-2"
          >
            <div className="bg-white/50 px-4 py-2 rounded-2xl italic text-xs text-gray-500">
              Ira is thinking...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 mb-2 bg-transparent z-10">
        <div className="flex items-center gap-2 h-12">
          <motion.div 
            className="h-full bg-white rounded-full flex items-center px-6 shadow-sm overflow-hidden"
            animate={{ flex: input.trim() ? 4 : 1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="talk to ira.."
              className="w-full bg-transparent outline-none text-black placeholder-gray-400 text-base"
              disabled={isLoading || messageLimitReached}
            />
          </motion.div>

          <motion.div 
            className="h-full rounded-full flex items-center justify-center shadow-sm overflow-hidden relative"
            animate={{ 
              flex: input.trim() ? 0.7 : 1,
              width: input.trim() ? '3rem' : '10rem',
              backgroundColor: input.trim() ? 'transparent' : '#ffffff' // Transparent when send button is active
            }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!input.trim() ? (
                <motion.div 
                  key="media"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-around w-full px-2"
                >
                  <Image 
                    src="/svgs/ion_camera-outline.svg" 
                    alt="Camera" 
                    width={24} 
                    height={24} 
                    className="cursor-pointer hover:scale-105 transition-transform" 
                  />
                  <Image 
                    src="/svgs/ion_image-outline.svg" 
                    alt="Gallery" 
                    width={22} 
                    height={22} 
                    className="cursor-pointer hover:scale-105 transition-transform" 
                  />
                  <Image 
                    src="/svgs/icon-park-solid_voice.svg" 
                    alt="Voice" 
                    width={22} 
                    height={22} 
                    className="cursor-pointer hover:scale-105 transition-transform" 
                  />
                </motion.div>
              ) : (
                <motion.button 
                  key="send"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-full h-full flex items-center justify-center bg-[#A89870] text-white rounded-full"
                >
                  <IoSend size={20} className="ml-0.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className="h-6 flex justify-center items-center pb-2">
        <div className="w-32 h-1 bg-black/80 rounded-full" />
      </div>

      {messageLimitReached && (
        <div className="absolute inset-0 bg-[#FAF1E8]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-young-serif), serif' }}>Limit Reached</h3>
              <p className="text-gray-600 mb-6 text-sm">You&apos;ve reached the message limit for the demo.</p>
              <a
                href="https://ira.rumik.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
              >
                Login to Continue
                <IoArrowRedo size={18} />
              </a>
            </motion.div>
        </div>
      )}
    </div>
  );
}
