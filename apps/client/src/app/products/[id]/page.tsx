import ProductInteraction from "@/components/ProductInteraction";
import { PRODUCT } from "@/mock/product.data";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  return {
    title: PRODUCT.name,
    describe: PRODUCT.description,
  };
};

const ProductPage = async ({ params, searchParams }: Props) => {
  const { color, size } = await searchParams;
  const selectedSize = size ?? PRODUCT.sizes[0];
  const selectedColor = color ?? PRODUCT.colors[0];
  const productId = await params;
  console.log(productId);

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={PRODUCT.images?.[selectedColor] || ""}
          alt={PRODUCT.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{PRODUCT.name}</h1>
        <p className="text-gray-500">{PRODUCT.description}</p>
        <h2 className="text-2xl font-semibold">${PRODUCT.price.toFixed(2)}</h2>
        <ProductInteraction
          product={PRODUCT}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src={"/klarna.png"}
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={"/cards.png"}
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={"/stripe.png"}
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
