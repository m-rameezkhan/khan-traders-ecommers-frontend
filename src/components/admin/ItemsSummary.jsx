import React from "react";
import { IoReceiptOutline } from "react-icons/io5";
import "./styles/ItemSummary.css"

const ItemsSummary = ({ items, totalAmount, deliveryFee, newDeliveryFee, setNewDeliveryFee }) => {
  // Calculation: (Total - Old Fee) + New Fee
  const productTotal = totalAmount - deliveryFee;
  const grandTotal = productTotal + Number(newDeliveryFee);

  return (
    <div className="detail-card">
      <div className="card-header">
        <h3><IoReceiptOutline /> Items Summary</h3>
      </div>

      <div className="items-table-container">
        <table className="items-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Price</th>
              <th>Qty</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <div className="product-cell">
                    <img src={item.product?.image} alt="product" />
                    <div>
                      <p className="p-name">{item.product?.name}</p>
                      <p className="p-id">ID: {item.product?._id?.slice(-6)}</p>
                    </div>
                  </div>
                </td>
                <td>Rs. {item.price}</td>
                <td>
                  {item.quantity}
                  <small className="unit-badge">
                    {item.product?.unit || "unit"}
                  </small>
                </td>
                <td className="text-right font-bold">Rs. {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-footer">
        <div className="summary-rows">
          <div className="s-row">
            <span>Subtotal</span>
            <span>Rs. {productTotal}</span>
          </div>
          <div className="s-row editable-fee">
            <span>Delivery Fee</span>
            <div className="fee-input-wrapper">
              <span>Rs. </span>
              <input
                type="number"
                value={newDeliveryFee}
                onChange={(e) => setNewDeliveryFee(e.target.value)}
              />
            </div>
          </div>
          <div className="s-row grand-total">
            <span>Grand Total</span>
            <span>Rs. {grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSummary;