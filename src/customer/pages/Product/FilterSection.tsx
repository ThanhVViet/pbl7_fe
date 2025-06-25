import React, {useState} from 'react';
import {Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {teal} from "@mui/material/colors";
import {colors} from "../../../data/filter/colors";
import {useSearchParams} from "react-router-dom";
import {price} from "../../../data/filter/price";
import {discount} from "../../../data/filter/discount";
import {useAppDispatch} from "../../../state/store";

const FilterSection = () => {

    const [expand, setExpand] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    const handleExpandColor = () => {
        setExpand(!expand);
    }

    const updateFilterParams = (e: any) => {
        const {value, name} = e.target;
        if (value) {
            searchParams.set(name, value);
        } else {
            searchParams.delete(name)
        }

        setSearchParams(searchParams);
    }

    const clearAllFilters = () => {
        searchParams.forEach((value: any, key: any) => {
            searchParams.delete(key);
        })
        setSearchParams(searchParams);
    }

    return (
        <div className='-z-50 space-y-5 bg-white'>
            <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
                <p className='text-lg font-semibold'>
                    Filters
                </p>
                <Button onClick={clearAllFilters} size='small' className='text-teal-600 cursor-pointer font-semibold'>
                    clear all
                </Button>


            </div>
            <Divider/>

            <div className='px-9 space-y-6'>
                <section>
                    <FormControl>
                        <FormLabel className='text-2xl font-semibold' id='color'
                                   sx={{
                                       fontSize: "16px",
                                       fontWeight: "bold",
                                       color: teal[500],
                                       pb: "14px"
                                   }}>Color</FormLabel>
                        <RadioGroup
                            aria-labelledby="color"
                            defaultValue=""
                            name="color"
                            onChange={updateFilterParams}
                        >
                            {
                                colors.slice(0, expand ? colors.length : 5).map((item) =>
                                    <FormControlLabel value={item.name} control={<Radio/>} label={
                                        <div className='flex items-center gap-3'>
                                            <p>{item.name}</p>
                                            <p style={{backgroundColor: item.hex}}
                                               className={`h-5 w-5 rounded-full ${item.name === "White" ? "border" : ""}`}>

                                            </p>
                                        </div>
                                    }/>
                                )
                            }

                        </RadioGroup>
                    </FormControl>
                    <div>
                        <button onClick={handleExpandColor}
                                className='text-primary-color cursor-pointer hover:text-teal-900 flex items-center'>
                            {
                                expand ? "hide" : `+${colors.length - 5} more`
                            }
                        </button>
                    </div>
                </section>
                <Divider/>
                <section>
                    <FormControl>
                        <FormLabel className='text-2xl font-semibold' id='price'
                                   sx={{
                                       fontSize: "16px",
                                       fontWeight: "bold",
                                       color: teal[600],
                                       pb: "14px"
                                   }}>Price</FormLabel>
                        <RadioGroup
                            aria-labelledby="price"
                            defaultValue=""
                            onChange={updateFilterParams}
                            name="price"
                        >
                            {
                                price.map((item) =>
                                    <FormControlLabel key={item.name} value={item.value} control={<Radio size='small'/>}
                                                      label={item.name}/>
                                )
                            }

                        </RadioGroup>
                    </FormControl>
                </section>
                <Divider/>

                {/*<section>*/}
                {/*    <FormControl>*/}
                {/*        <FormLabel className='text-2xl font-semibold' id='discount'*/}
                {/*                   sx={{*/}
                {/*                       fontSize: "16px",*/}
                {/*                       fontWeight: "bold",*/}
                {/*                       color: teal[600],*/}
                {/*                       pb: "14px"*/}
                {/*                   }}>Discount</FormLabel>*/}
                {/*        <RadioGroup*/}
                {/*            aria-labelledby="discount"*/}
                {/*            defaultValue=""*/}
                {/*            onChange={updateFilterParams}*/}
                {/*            name="discount"*/}
                {/*        >*/}
                {/*            {*/}
                {/*                discount.map((item) =>*/}
                {/*                    <FormControlLabel key={item.name} value={item.value} control={<Radio size='small'/>}*/}
                {/*                                      label={item.name}/>*/}
                {/*                )*/}
                {/*            }*/}

                {/*        </RadioGroup>*/}
                {/*    </FormControl>*/}
                {/*</section>*/}
            </div>
        </div>
    );
};

export default FilterSection;
