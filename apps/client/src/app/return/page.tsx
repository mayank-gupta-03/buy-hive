import Link from "next/link";

interface Props {
  searchParams: Promise<{ session_id: string }> | undefined;
}

const ReturnPage = async ({ searchParams }: Props) => {
  const sessionId = (await searchParams)?.session_id;

  if (!sessionId) {
    return <div>No session id found!</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions/${sessionId}`
  );
  const { data } = await res.json();

  return (
    <div>
      <h1>Payment {data.status}</h1>
      <p>Payment Status: {data.paymentStatus}</p>
      <Link href={"/orders"}>See your orders</Link>
    </div>
  );
};

export default ReturnPage;
