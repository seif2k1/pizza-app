import { loadStripe } from "@stripe/stripe-js";
let stripePromise;

const getStripe = () => {
  if (stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51NrVhxFhh95GN9hHdpU39nBg40lBnI44JyHhXjxGjRkppE9PTU8ScWllw8ABbnKuiuks9Li5rydcRszj4L8boJ29003nbBmTXN"
    );
  }
  return stripePromise;
};
export default getStripe;
