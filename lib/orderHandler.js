export const creatOrder = async () => {
  const res = await fetch("http://localhost:3000/api/order", {
    method: "GET" /* ,
    body: JSON.stringify({
      name,
    }), */,
  });
  const id = await res.json();
  return id;
};
/* 
      phone: phone,
      address: address,
      total: parseFloat(total),
      status: 1,
      paymentmethod: Paymentmethod, */
