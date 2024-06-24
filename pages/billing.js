
import Head from "next/head";

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Next Stripe</title>
      </Head>
      <div className="flex h-screen justify-center items-center">
        <div>
          <CheckoutButton amount={1}/>
        </div>
      </div>
    </>
  );
}