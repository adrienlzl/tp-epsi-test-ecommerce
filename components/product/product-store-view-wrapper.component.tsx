'use client'

import React, { Suspense } from 'react'



import LoadingComponent from "@/components/layout/loading/layout-loading.component";
import {Product} from "@/lib/interfaces/interface";
import ProductGridItems from "@/components/product/product-grid-item.component";

interface StoreViewWrapperProps {
    products: Product[]
}

export default function StoreViewWrapper({ products }: StoreViewWrapperProps) {
    return (
        <div className="mx-12 lg:mt-[50px] lg:mx-[50px] lg:pb-[50px]">
        <Suspense fallback={<LoadingComponent />}>
    <ProductGridItems products={products} />
    </Suspense>
    </div>
)
}