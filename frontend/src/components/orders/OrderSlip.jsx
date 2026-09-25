import './OrderSlip.css';

export default function OrderSlip({ order }) {
  if (!order) return null;

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="print-only order-slip">
      <div className="slip-header">
        <div className="slip-brand">
          <h1>WA Commerce AI</h1>
          <p>AI E-Commerce Agent</p>
        </div>
        <div className="slip-title">
          <h2>Order Slip / Invoice</h2>
          <div className="slip-meta">
            <strong>Order #:</strong> {order.id}<br/>
            <strong>Date:</strong> {formatDate(order.date)}
          </div>
        </div>
      </div>

      <div className="slip-addresses">
        <div className="slip-address-box">
          <h3>Customer Details</h3>
          <p>
            <strong>{order.customer.name}</strong><br/>
            {order.customer.email}<br/>
            Phone: {order.customer.phone}
          </p>
        </div>
        <div className="slip-address-box">
          <h3>Shipping Address</h3>
          <p>
            {order.customer.address.street}<br/>
            {order.customer.address.city}, {order.customer.address.province} {order.customer.address.postalCode}
          </p>
        </div>
      </div>

      <table className="slip-table">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Qty</th>
            <th className="text-right">Unit Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-right">${item.unitPrice.toFixed(2)}</td>
              <td className="text-right">${item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="slip-summary-container">
        <div className="slip-payment-info">
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          <p><strong>Order Status:</strong> {order.status}</p>
        </div>
        
        <table className="slip-summary-table">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>${order.shipping.toFixed(2)}</td>
            </tr>
            {order.discount > 0 && (
              <tr>
                <td>Discount</td>
                <td>-${order.discount.toFixed(2)}</td>
              </tr>
            )}
            <tr>
              <td>Tax</td>
              <td>${order.tax.toFixed(2)}</td>
            </tr>
            <tr className="slip-grand-total">
              <td>Grand Total</td>
              <td>${order.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="slip-footer">
        <p>Thank you for your order.</p>
      </div>
    </div>
  );
}
