import React, { useState } from "react";
import StripeContainer from "./StripeContainer";

const ProductDisplay: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {showForm ? (
        <StripeContainer />
      ) : (
        <>
          <h3>$100.00</h3> <img src="" alt="" />
          <button onClick={() => setShowForm(true)}>BUY</button>
        </>
      )}
    </div>
  );
};

export default ProductDisplay;
