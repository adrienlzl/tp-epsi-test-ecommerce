import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {useCartStore} from "@/components/cart/cart-store";
import {CartButton} from "@/components/cart/add-to-cart-button";
import {CartItem} from "@/components/cart/cart-item";
import {CartSummary} from "@/components/cart/cart-summary";

export function Cart() {
    const {items, isOpen, setIsOpen, updateQuantity} = useCartStore();

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <CartButton itemCount={getTotalItems()} onClick={() => setIsOpen(true)}/>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="ml-8 text-xl font-semibold tendre-black">Votre Panier</SheetTitle>
                </SheetHeader>

                <div className="pl-4 pr-4 mt-8 space-y-4 max-h-[75vh] w-full overflow-y-auto">
                    {items.length === 0 ? (
                        <h3 className="text-center text-3xl tendre-black font-bold mt-24">Votre panier est vide</h3>
                    ) : (
                        <>
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                />
                            ))}
                            <CartSummary
                                total={getTotal()}
                                onClose={() => setIsOpen(false)} />
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
