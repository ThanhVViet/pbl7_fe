import React from 'react';
import { CircularProgress, Skeleton } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';

interface LoadingWrapperProps {
    loading: boolean;
    error?: string | null;
    children: React.ReactNode;
    type?: 'circular' | 'skeleton';
    count?: number;
    layout?: 'grid' | 'row';
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ 
    loading, 
    error, 
    children, 
    type = 'circular',
    count = 4,
    layout = 'grid'
}) => {
    if (error) {
        return (
            <div className="error-container">
                <SentimentDissatisfied sx={{ fontSize: 60, color: 'rgb(239, 68, 68)', mb: 2 }} />
                <div className="text-red-500 text-lg font-medium mb-2">Rất tiếc, đã có lỗi xảy ra</div>
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

    if (loading) {
        if (type === 'circular') {
            return (
                <div className="loading-circular flex flex-col items-center justify-center min-h-[400px]">
                    <CircularProgress 
                        size={50} 
                        thickness={4}
                        sx={{
                            color: 'var(--primary-color, #1976d2)',
                            zIndex: 1
                        }}
                    />
                    <div className="text-gray-600 mt-4 font-medium z-[1]">Đang tải dữ liệu...</div>
                </div>
            );
        }

        const containerClass = layout === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "grid grid-cols-6 gap-4";

        const itemClass = "loading-skeleton bg-white rounded-lg overflow-hidden shadow-sm";

        return (
            <div className={containerClass}>
                {[...Array(count)].map((_, index) => (
                    <div key={index} className={itemClass}>
                        <Skeleton 
                            variant="rectangular" 
                            height={200}
                            animation="wave"
                            className="loading-wrapper"
                        />
                        <div className="p-4 space-y-3">
                            <Skeleton 
                                variant="text" 
                                height={24} 
                                width="80%"
                                animation="wave"
                                className="loading-wrapper"
                            />
                            <Skeleton 
                                variant="text" 
                                height={20} 
                                width="60%"
                                animation="wave"
                                className="loading-wrapper"
                            />
                            <Skeleton 
                                variant="rectangular" 
                                height={36}
                                animation="wave"
                                className="loading-wrapper rounded"
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return <>{children}</>;
};

export default LoadingWrapper; 