type Props = {
  subtotal: number;
  shippingFee: number;
  discount?: number;
  grandTotal: number;
};

export default function OrderSummary({ subtotal, shippingFee, discount = 0, grandTotal }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Shipping</span>
          <span className="font-medium">
            {shippingFee === 0 ? (
              <span className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-0.5 font-semibold">
                Free
              </span>
            ) : (
              `₹${shippingFee.toLocaleString("en-IN")}`
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 text-sm">
            <span>Discount (10% OFF)</span>
            <span className="font-medium">-₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}
        
        <div className="border-t border-gray-100 pt-4 mt-2">
          <div className="flex justify-between items-center text-gray-800">
            <span className="font-semibold">Grand Total</span>
            <span className="text-xl font-bold text-green-600">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
