'use client'

import {Cart} from "@/components/cart/cart";

export function Header() {


    return (
        <header className="w-full flex justify-end px-6 py-4 bg-white shadow-sm">
            <Cart/>
        </header>
    )
}
