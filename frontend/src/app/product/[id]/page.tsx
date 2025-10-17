import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductPage(props: PageProps) {
  const { id } = await props.params;
  const product = await getProductById(id);
  //   console.log(product);
  if (!product) return notFound();
  return (
    <div className="card grid gap-4 p-4 md:grid-cols-[1.2fr_1fr]">
      <div
        className="relative w-full overflow-hidden rounded-md bg-black/60"
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col h-full gap-2 text-gray-800">
        <h1
          className="text-2xl font-extrabold"
          style={{ color: "rgb(var(--text))" }}
        >
          {product.name}
        </h1>
        <p style={{ color: "rgb(var(--text))" }}>{product.description}</p>
        <div
          className="prose prose-invert max-w-none mt-4 text-gray-800 dark:text-gray-100"
          style={{ color: "rgb(var(--text))" }}
        >
          <p>{product.details}</p>
        </div>
        <div className="mt-auto w-full flex flex-col gap-2">
          <div className="flex items-center gap-4 justify-between w-full">
            <span
              className="text-xl font-extrabold"
              style={{ color: "rgb(var(--text))" }}
            >
              {formatPrice(product.priceCents)}
            </span>
            <span className="" style={{ color: "rgb(var(--text))" }}>
              Stock: {product.stock}
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
