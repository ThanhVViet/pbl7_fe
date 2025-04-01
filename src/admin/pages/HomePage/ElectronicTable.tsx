import React from 'react';
import {useAppSelector} from "../../../state/store";
import HomeCategoryTable from "./HomeCategoryTable";


const ElectronicTable = () => {
    const {customer} = useAppSelector(store => store)

    return (
        <>
            <HomeCategoryTable data={customer.homePageData?.electricCategories || []} />
        </>

    );
};

export default ElectronicTable;

