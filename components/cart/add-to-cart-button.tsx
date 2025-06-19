import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CartButtonProps {
    itemCount: number
    onClick: () => void
}

export function CartButton({ itemCount, onClick }: CartButtonProps) {
    return (
        <button
            variant="ghost"
            className="relative bg-tendre-white-hover"
            onClick={onClick}
        >
            <ShoppingCart className="h-7 w-7 text-white tendre-black-hover" />

            {itemCount > 0 ? (
                <Badge variant="destructive" className="absolute -top-2 -right-2">
                    {itemCount}
                </Badge>
            ) : (
                <></>
            )}
        </button>
    )
}
