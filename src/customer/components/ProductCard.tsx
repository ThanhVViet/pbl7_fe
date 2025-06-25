import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
    item: {
        id: number;
        name: string;
        price: number;
        image: string;
        brand: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="h-full flex flex-col">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.name}
                        className="object-contain p-4"
                        onClick={() => navigate(`/product/${item.id}`)}
                        sx={{ cursor: 'pointer' }}
                    />
                </motion.div>
                <CardContent className="flex-grow">
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mb-2">
                        {item.brand}
                    </Typography>
                    <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Typography variant="h6" color="primary" className="font-bold">
                            {item.price.toLocaleString()}đ
                        </Typography>
                    </motion.div>
                </CardContent>
                <div className="p-4 pt-0">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            variant="contained" 
                            fullWidth
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            View Details
                        </Button>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
};

export default ProductCard; 