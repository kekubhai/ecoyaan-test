import type { CartItem as CartItemType } from "@/types";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const itemTotal = item.product_price * item.quantity;

  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Product Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-full object-cover rounded-lg bg-gray-100"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
          {item.product_name}
        </h3>
        <p className="text-green-600 font-semibold mt-1">
          ₹{item.product_price.toLocaleString("en-IN")}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-500 text-sm">Qty: {item.quantity}</span>
          <span className="text-gray-800 font-medium text-sm sm:text-base">
            ₹{itemTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}