import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/shoppingCartContext"


type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItems({ id, name, price, imgUrl }: StoreItemProps) {
    const {
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity,
        removeFromCart,
    }  = useShoppingCart()
    const quantity = getItemQuantity(id)

    return (
        <Card className="h-100">
            <Card.Img
                src={imgUrl}
                alt={name}
                height="200px"
                style={{ objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-5">{name}</span>
                    <span className="ms-2 text-muted fs-5">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100 bg-dark border-0" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: "10px" }}>
                            <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ gap: "10px" }}>
                                <Button variant="outline-dark" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-6">{quantity} in cart</span>
                                    </div>
                                <Button variant="outline-dark" onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button className="bg-danger border-0" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}