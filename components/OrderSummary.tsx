type Props = {
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
};

export default function OrderSummary({ subtotal, shippingFee, grandTotal }: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shippingFee === 0 ? "Free" : `₹${shippingFee.toLocaleString("en-IN")}`}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-gray-800 font-bold text-lg">
            <span>Grand Total</span>
            <span className="text-green-600">₹{grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}