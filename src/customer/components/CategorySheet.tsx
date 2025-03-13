import React from 'react';
import {menLevelTwo} from "../../data/category/level two/menLevelTwo";
import {womenLevelThree} from "../../data/category/level three/womenLevelThree";
import {furnitureLevelThree} from "../../data/category/level three/furnitureLevelThree";
import {electronicsLevelThree} from "../../data/category/level three/electronicsLevelThree";
import {menLevelThree} from "../../data/category/level three/menLevelThree";
import {electronicsLevelTwo} from "../../data/category/level two/electronicsLevelTwo";
import {furnitureLevelTwo} from "../../data/category/level two/furnitureLevelTwo";
import {womenLevelTwo} from "../../data/category/level two/womenLevelTwo";
import {Box} from "@mui/material";

const categoryTwo = {
  men: menLevelTwo,
    women: womenLevelTwo,
    home_furniture: furnitureLevelTwo,
    electronics: electronicsLevelTwo
}
const categoryThree = {
    men: menLevelThree,
    women: womenLevelThree,
    home_furniture: furnitureLevelThree,
    electronics: electronicsLevelThree
}
const CategorySheet = () => {
    return (
        <Box className='bg-white shadow-lg lg:h-[500px] overflow-y-auto '>
            <div className='flex text-sm flex-wrap'>
                {

                }
            </div>
        </Box>
    );
};

export default CategorySheet;
