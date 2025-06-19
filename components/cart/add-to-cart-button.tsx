import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CartButtonProps {
    itemCount: number
    onClick: () => void
}

export function CartButton({ itemCount, onClick }: CartButtonProps) {
    return (
        <button
            className="relative bg-tendre-white-hover cursor-pointer"
            onClick={onClick}
        >
            <ShoppingCart className="h-8 w-8 text-red tendre-black-hover" />

            {itemCount > 0 ? (
                <Badge variant="destructive" className="absolute w-5 h-5 -top-2 -right-2">
                    {itemCount}
                </Badge>
            ) : (
                <></>
            )}
        </button>
    )
}
