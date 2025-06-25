import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../state/store";
import LoadingWrapper from '../../components/LoadingWrapper';

interface Recommendation {
    title: string;
    description: string;
    selling_price: string;
    images: string;
    category_id: string;
    relevance_score: number;
}

const RecommendationSection = ({userId}: { userId: string }) => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {lastOrderTime} = useAppSelector(state => state.order);

    const renderSkeleton = () => (
        <div className="grid grid-cols-6 gap-4">
            {[...Array(6)]?.map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                    <div className="w-full aspect-[4/3] mb-4 rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    );

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('http://localhost:8888/api/v1/ai/recommendations', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        user_id: userId,
                        limit: 6
                    }),
                });

                if (!res.ok) {
                    throw new Error(`Server responded with status ${res.status}`);
                }

                const data = await res.json();
                console.log('Recommendation API response:', data);
                if (data.status === 'success') {
                    setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
                } else {
                    throw new Error('Failed to fetch recommendations');
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
                setError('Không thể tải gợi ý sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchRecommendations();
    }, [userId, lastOrderTime]);

    return (
        <div className="py-10">
            {loading ? (
                renderSkeleton()
            ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <svg className="w-16 h-16 mb-4 text-red-300" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Rất tiếc, đã có lỗi xảy ra</h2>
                    <p className="text-gray-500">Không thể tải gợi ý sản phẩm. Vui lòng thử lại sau.</p>
                </div>
            ) : (Array.isArray(recommendations) && recommendations.length > 0) ? (
                <div className="grid grid-cols-6 gap-4">
                    {recommendations.map((rec, idx) => {
                        let images: string[] = [];
                        try {
                            if (typeof rec.images === 'string') {
                                images = JSON.parse(rec.images);
                                if (!Array.isArray(images)) images = [];
                            } else if (Array.isArray(rec.images)) {
                                images = rec.images;
                            }
                        } catch {
                            images = [];
                        }
                        const firstImage = images[0] ?? 'https://via.placeholder.com/100';
                        return (
                            <div key={idx}
                                 className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition-shadow duration-300">
                                <div className="w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={firstImage}
                                        alt={rec.title}
                                        className="w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                                    />
                                </div>
                                <div className="font-semibold text-sm text-center line-clamp-2 mb-2">{rec.title}</div>
                                <div className="text-primary-color font-bold">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(Number(rec.selling_price))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <svg className="w-20 h-20 mb-4 text-gray-400" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Chưa có gợi ý nào</h2>
                    <p className="text-gray-500 max-w-md">Hãy mua sắm để chúng tôi có thể gợi ý những sản phẩm phù hợp với bạn.</p>
                </div>
            )}
        </div>
    );
};

export default RecommendationSection;