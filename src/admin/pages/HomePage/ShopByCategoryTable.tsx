import React from 'react';
import HomeCategoryTable from "./HomeCategoryTable";
import {useAppSelector} from "../../../state/store";

const ShopByCategoryTable = () => {

    const {categories} = useAppSelector(store => store.admin)

    return (
        <div>
            <HomeCategoryTable data={categories || []}/>
        </div>
    );
};

export default ShopByCategoryTable;
