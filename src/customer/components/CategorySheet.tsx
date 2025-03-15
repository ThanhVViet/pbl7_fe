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
import zIndex from "@mui/material/styles/zIndex";

const categoryTwo: {[key: string]: any[]} = {
  men: menLevelTwo,
    women: womenLevelTwo,
    home_furniture: furnitureLevelTwo,
    electronics: electronicsLevelTwo
}
const categoryThree : {[key: string]: any[]} = {
    men: menLevelThree,
    women: womenLevelThree,
    home_furniture: furnitureLevelThree,
    electronics: electronicsLevelThree
}
const CategorySheet = ({selectedCategory, setShowSheet}:any) => {

    const childCategory = (category:any, parentCategoryId:any)=> {
        return category.filter((child:any) => child.parentCategoryId === parentCategoryId )
    }
    return (
        <Box sx={{zIndex: 1}} className='bg-white shadow-lg lg:h-[500px] overflow-y-auto '>
            <div className='flex text-sm flex-wrap'>
                {
                    categoryTwo[selectedCategory]?.map((item, index) => <div className={`p-8 lg:w-[20%] 
                    ${index%2===0? "bg-slate-50" : "bg-white"}`}>
                        <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>


                        <ul className='space-y-3 '>

                                  {
                            childCategory(categoryThree[selectedCategory], item.categoryId).map((item:any) => <div>
                                     <li className='hover:text-primary-color cursor-pointer '>
                                {item.name}

                            </li>
                            </div>)
                        }


                        </ul>
                    </div>)
                }
            </div>
        </Box>
    );
};

export default CategorySheet;
