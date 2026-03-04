type Props = {
  subtotal: number;
  shippingFee: number;
  discount?: number;
  grandTotal: number;
};

export default function OrderSummary({ subtotal, shippingFee, discount = 0, grandTotal }: Props) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-muted-foreground text-sm">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        
        <div className="flex justify-between text-muted-foreground text-sm">
          <span>Shipping</span>
          <span className="font-medium text-foreground">
            {shippingFee === 0 ? (
              <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full px-2 py-0.5 font-semibold">
                Free
              </span>
            ) : (
              `₹${shippingFee.toLocaleString("en-IN")}`
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-500 text-sm">
            <span>Discount (10% OFF)</span>
            <span className="font-medium">-₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-4 mt-2">
          <div className="flex justify-between items-center text-foreground">
            <span className="font-semibold">Grand Total</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-500">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
