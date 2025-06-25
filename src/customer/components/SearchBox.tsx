import React, { useState, useEffect } from 'react';
import {
    Box, InputBase, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../state/store";
import { debounce } from 'lodash';
import { searchProduct } from "../../state/customer/ProductSlice";
import { motion, AnimatePresence } from 'framer-motion';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { searchProducts } = useAppSelector((store) => store.product);
    const [open, setOpen] = useState(false);

    const handleSearch = debounce(async (value: string) => {
        if (value.trim().length === 0) {
            setOpen(false);
            return;
        }
        dispatch(searchProduct(value));
        setOpen(true);
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    const handleClear = () => {
        setQuery('')
        setOpen(false)
    };

    useEffect(() => {
        if (searchProducts.length === 0) {
            setOpen(false)
        }
    }, [searchProducts])

    const searchContainerVariants = {
        focus: {
            scale: 1.02,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transition: {
                type: "spring" as "spring",
                stiffness: 300,
                damping: 20
            }
        },
        blur: {
            scale: 1,
            boxShadow: "none",
            transition: {
                type: "spring" as "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const resultsContainerVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                type: "spring" as "spring",
                stiffness: 500,
                damping: 30
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as "spring",
                stiffness: 500,
                damping: 30
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as "spring",
                stiffness: 500,
                damping: 30
            }
        },
        hover: {
            scale: 1.02,
            backgroundColor: "rgba(0,0,0,0.04)",
            transition: {
                type: "spring" as "spring",
                stiffness: 500,
                damping: 30
            }
        }
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <motion.div
                initial="blur"
                whileHover="focus"
                whileFocus="focus"
                variants={searchContainerVariants}
            >
                <Paper
                    component="form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                        px: 2,
                        py: 1,
                        boxShadow: 'none',
                        border: '1px solid #ccc',
                        flexGrow: 1,
                    }}
                >
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SearchIcon sx={{ mr: 1 }} />
                    </motion.div>
                    <InputBase
                        placeholder="Tìm kiếm sản phẩm..."
                        fullWidth
                        value={query}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                        }}
                    />
                    <AnimatePresence>
                        {query && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <IconButton color='error' onClick={handleClear} sx={{ ml: 1 }}>
                                    <motion.div whileHover={{ rotate: 90 }}>
                                        <ClearIcon />
                                    </motion.div>
                                </IconButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Paper>
            </motion.div>

            <AnimatePresence>
                {open && searchProducts.length > 0 && (
                    <motion.div
                        variants={resultsContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Paper sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            maxHeight: 400,
                            overflowY: 'auto',
                            zIndex: 10,
                            mt: 1
                        }}>
                            <List>
                                {searchProducts?.map((item: any, index: number) => (
                                    <motion.div
                                        key={item.id}
                                        variants={listItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ListItem
                                            onClick={() => navigate(`/product-details/undefined/${item.title}/${item.id}`)}
                                            sx={{
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                margin: '4px',
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <motion.div whileHover={{ scale: 1.1 }}>
                                                    <Avatar src={item?.images[0]} variant="square" />
                                                </motion.div>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item?.title}
                                                secondary={
                                                    <motion.span
                                                        initial={{ color: '#f44336' }}
                                                        whileHover={{ scale: 1.1, originX: 0 }}
                                                        style={{ display: 'inline-block', fontWeight: 500 }}
                                                    >
                                                        {item.sellingPrice?.toLocaleString()}₫
                                                    </motion.span>
                                                }
                                            />
                                        </ListItem>
                                    </motion.div>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default SearchBox;
