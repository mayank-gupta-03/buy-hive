import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  console.info("Clerk Token:", token);
  const productServiceResponse = await fetch(
    "http://localhost:4000/api/v1/test",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const orderServiceResponse = await fetch(
    "http://localhost:4001/api/v1/test",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const paymentServiceResponse = await fetch(
    "http://localhost:4002/api/v1/test",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!productServiceResponse.ok) console.error("Product Service Error:");
  if (!orderServiceResponse.ok) console.error("Order Service Error:");
  if (!paymentServiceResponse.ok) console.error("Payment Service Error:");
  console.info(
    "Product Service Response:",
    await productServiceResponse.json()
  );
  console.info("Order Service Response:", await orderServiceResponse.json());
  console.info(
    "Payment Service Response:",
    await paymentServiceResponse.json()
  );
  return <div>Check console to verify test responses</div>;
};

export default TestPage;
