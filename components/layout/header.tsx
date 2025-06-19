'use client'

import { usePathname } from 'next/navigation'
import {Cart} from "@/components/cart/cart";
import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";

export function Header() {

    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    const breadcrumbLinks = []

    if (segments.length === 0 || segments[0] === 'product') {
        breadcrumbLinks.push({ label: 'Produits', url: '/' });

        if (segments.length > 1) {
            breadcrumbLinks.push({ label: 'Détail', url: pathname });
        }
    }


    return (
        <header className="w-full flex justify-between px-6 py-4 bg-white shadow-sm">
            <BreadcrumbComponent links={breadcrumbLinks} />
            <Cart/>
        </header>
    )
}
