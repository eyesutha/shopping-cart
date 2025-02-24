import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: number,
    quantity: number,
}


export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.imgUrl}
                alt={item.name}
                style={{ width: "125px", height: "75px", objectFit: "cover" }} />
            <div className="me-auto">
                <div>
                    <div className="fs-5">{item.name} {" "}</div>
                    {quantity > 1 && (
                        <span className="text-muted" style={{fontSize: "14px"}}>x{quantity}</span>
                    )}
                </div>
                <div className="text-muted">
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button 
            variant="outline-danger" 
            onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )

}