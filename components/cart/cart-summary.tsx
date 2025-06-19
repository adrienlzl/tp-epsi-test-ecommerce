import {Button} from '@/components/ui/button';
import Link from "next/link";

interface CartSummaryProps {
    total: number;
    onClose: () => void;
}

export function CartSummary({total, onClose}: CartSummaryProps) {
    const handleClick = () => {
        onClose();
    };

    return (
        <div
            className="fixed bottom-0  w-[80%]  sm:w-[450px]  p-4">
            <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">{total.toFixed(2)} €</span>
            </div>
            <div className="w-full flex justify-center">
                <Link href={"/commande"}>
                    <Button size="lg"
                            className={"bg-tendre-black hover:bg-stone-500  "}
                            onClick={handleClick} >
                        Passer votre commande
                    </Button>
                </Link>
            </div>
        </div>

    );
}
