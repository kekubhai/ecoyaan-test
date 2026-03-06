import type { CartItem as CartItemType } from "@/types";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const itemTotal = item.product_price * item.quantity;

  return (
    <div className="group flex gap-4 bg-card p-4 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-full object-cover rounded-xl bg-muted"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight truncate transition-colors duration-300">
            {item.product_name}
          </h3>
          <span className="font-bold text-foreground text-sm sm:text-base whitespace-nowrap transition-colors duration-300">
            ₹{itemTotal.toLocaleString("en-IN")}
          </span>
        </div>
        
        <div className="mt-1 flex items-center justify-between">
            <p className="text-accent-green font-medium text-sm transition-colors duration-300">
            ₹{item.product_price.toLocaleString("en-IN")}
            </p>
        </div>

        <div className="mt-2 flex items-center">
          <span className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full transition-colors duration-300">
            Qty: {item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
