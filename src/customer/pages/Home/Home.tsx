import React from 'react';
import ElectricCategory from "./ElectronicCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import {Button} from "@mui/material";
import {Storefront} from "@mui/icons-material";
import Chatbot from "../../components/Chatbot";
import RecommendationSection from "./RecommendationSection";
import {useAppSelector} from "../../../state/store";
import Brands from "./Brands/Brands";

const Home = () => {
    const {user} = useAppSelector(store => store.auth);
    return (
        <>
            <div className='space-y-5 lg:space-y-10 relative'>
                <ElectricCategory/>

                <CategoryGrid/>

                <div className='pt-20'>
                    <Brands/>
                </div>

                <section className='py-20'>
                    <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center'>
                        Gợi ý dành riêng cho bạn
                    </h1>
                    <RecommendationSection userId={user?.id?.toString() || ''}/>
                </section>

                {/*<section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>*/}
                {/*    <img className='h-full w-full '*/}
                {/*         src='https://m.media-amazon.com/images/G/31/amazonservices/Becoming_an_online_seller.jpg'*/}
                {/*         alt=''/>*/}

                {/*    <div*/}
                {/*        className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>*/}
                {/*        <h1>sell your product</h1>*/}
                {/*        <p className='text-lg md:text-2xl'>with <span className='logo'>viet</span></p>*/}
                {/*        <div className='pt-6 flex justify-center'>*/}
                {/*            <Button startIcon={<Storefront/>} variant='contained' size='large'>*/}
                {/*                become seller*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </div>
            <Chatbot/>

        </>
    );
};

export default Home;
