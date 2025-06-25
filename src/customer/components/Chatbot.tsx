import React, {useState} from 'react';
import {useAppSelector} from "../../state/store";
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from "react-router-dom";

interface Message {
    from: 'bot' | 'user';
    text: string;
}

interface Recommendation {
    title: string;
    description: string;
    selling_price: string;
    images: string;
    category_id: string;
    relevance_score: number;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        {from: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?'}
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [sessionId] = useState('web-' + Date.now());
    const {user} = useAppSelector(store => store.auth);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [productCards, setProductCards] = useState<any[]>([]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {from: 'user', text: input};
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setProductCards([]);
        try {
            const response = await fetch('http://localhost:8888/api/v1/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: input,
                    session_id: sessionId,
                    user_id: user?.id,
                }),
            });

            const data = await response.json();
            const parts = data?.choices?.[0]?.message?.content?.parts as { text: string }[];
            const botText = parts?.map((p) => p.text).join(" ") || "Xin lỗi, tôi không hiểu.";
            setMessages(prev => [...prev, {from: 'bot', text: botText}]);

            // Lưu products_info nếu có
            if (data.products_info && Array.isArray(data.products_info)) {
                setProductCards(data.products_info);
            } else {
                setProductCards([]);
            }

            // Lấy route từ response
            const route = data?.route;

            if (route !== 'chitchat') {
                const recommendationResponse = await fetch('http://localhost:8888/api/v1/ai/recommendations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user?.id,
                        query: input,
                        limit: 3,
                        route: route,
                    }),
                });

                const recommendationData = await recommendationResponse.json();
                if (recommendationData.status === 'success') {
                    setRecommendations(Array.isArray(recommendationData.recommendations) ? recommendationData.recommendations : []);
                }
            } else {
                setRecommendations([]);
            }
        } catch (err) {
            console.error("Failed to fetch AI response:", err);
            setMessages(prev => [...prev, {from: 'bot', text: 'Đã xảy ra lỗi khi phản hồi.'}]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper: Try to parse product info from bot message (simple JSON or markdown list)
    function parseProductCards(text: string) {
        // Simple heuristic: if message contains **Brand** or **Giá bán** or numbered list, try to split
        if (!text.match(/\*\*.*\*\*/)) return null;
        // Split by numbered list
        const productBlocks = text.split(/\*\*\d+\./).filter(Boolean);
        if (productBlocks.length === 0) return null;
        return productBlocks.map((block, idx) => {
            // Extract fields
            const titleMatch = block.match(/\*\*(.*?)\*\*/);
            const brandMatch = block.match(/Brand\):\*\*\s*([\w\s]+)/i);
            const colorMatch = block.match(/Color\):\*\*\s*([\w\s]+)/i);
            const priceMatch = block.match(/Giá bán.*?\*\*([\d\.\,\sVNĐ]+)/i);
            const imgMatch = block.match(/!\[.*?\]\((.*?)\)/); // markdown image
            const title = titleMatch ? titleMatch[1] : `Sản phẩm ${idx+1}`;
            const brand = brandMatch ? brandMatch[1] : '';
            const color = colorMatch ? colorMatch[1] : '';
            const price = priceMatch ? priceMatch[1].replace(/[^\d]/g,"") : '';
            const img = imgMatch ? imgMatch[1] : undefined;
            return {title, brand, color, price, img, raw: block};
        });
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <motion.button
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{type: 'spring', stiffness: 300}}
                    className="bg-[#00927c] text-white p-3 rounded-full shadow-lg hover:bg-[#007c68] transition"
                    onClick={() => setIsOpen(true)}
                >
                    💬
                </motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{y: 100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 100, opacity: 0}}
                        transition={{type: 'spring', stiffness: 200, damping: 20}}
                        className="w-[400px] h-[600px] bg-white rounded-2xl shadow-xl mt-3 flex flex-col overflow-hidden border border-gray-200"
                    >
                        <div
                            className="bg-[#00927c] text-white px-4 py-2 font-semibold flex justify-between items-center">
                            <span>VGear • Chat với chúng tôi</span>
                            <button
                                className="text-white text-lg hover:text-gray-200"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="overflow-y-auto p-3 space-y-2 text-sm flex-1 flex flex-col">
                            <AnimatePresence initial={false}>
                                {messages?.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, x: msg.from === 'bot' ? -30 : 30}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: msg.from === 'bot' ? -30 : 30}}
                                        transition={{duration: 0.3}}
                                        className={`p-2 rounded-lg max-w-[75%] ${
                                            msg.from === 'bot'
                                                ? 'bg-gray-100 text-gray-800 self-start'
                                                : 'bg-green-100 text-[#00927c] self-end ml-auto'
                                        }`}
                                    >
                                        {msg.text}
                                    </motion.div>
                                ))}
                                {productCards.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-2">
                                        {productCards.map((prod, i) => {
                                            // Robust image extraction
                                            let imgSrc = '';
                                            if (Array.isArray(prod.images)) {
                                                imgSrc = prod.images[0];
                                            } else if (typeof prod.images === 'string') {
                                                try {
                                                    const arr = JSON.parse(prod.images);
                                                    if (Array.isArray(arr)) imgSrc = arr[0];
                                                    else imgSrc = prod.images;
                                                } catch {
                                                    imgSrc = prod.images;
                                                }
                                            }
                                            if (!imgSrc) imgSrc = '/placeholder.png'; 
                                            const cardKey = prod.id ? String(prod.id) : `${i}-${prod.title || ''}`;
                                            return (
                                                <div key={cardKey} className="bg-white border rounded-lg shadow p-3 flex gap-3 items-center cursor-pointer hover:shadow-lg transition"
                                                    onClick={() => {
                                                        console.log('Go to product:', prod.id, prod.categoryId, prod.title, prod);
                                                        navigate(`/product-details/${prod.categoryId}/${encodeURIComponent(prod.title)}/${prod.id}`);
                                                    }}>
                                                    <img src={imgSrc} alt="" className="w-16 h-16 object-cover rounded" />
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-base line-clamp-2">{prod.title || `Sản phẩm #${i+1}`}</div>
                                                    </div>
                                                    <button className="ml-2 px-3 py-1 bg-[#00927c] text-white rounded hover:bg-[#007c68] text-xs">Xem chi tiết</button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {isLoading && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: [1, 1.1, 1]}}
                                        transition={{duration: 0.8, repeat: Infinity, repeatType: 'loop'}}
                                        className="p-2 rounded-lg max-w-[75%] bg-gray-100 text-gray-800 self-start flex items-center gap-2"
                                    >
                                        <span className="chatbot-typing">
                                            <span className="dot">.</span>
                                            <span className="dot">.</span>
                                            <span className="dot">.</span>
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center border-t px-3 py-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Nhập nội dung..."
                                className="flex-1 text-sm outline-none p-2"
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="text-[#00927c] font-semibold hover:text-[#007c68] transition ml-2"
                            >
                                Gửi
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;