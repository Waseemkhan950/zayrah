import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./ProductPrice";
import { Product } from "@/types/validators";
const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card className="w-full max-w-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg p-6">
			<CardHeader className="p-0 items-center">
				<Link href={`/product/${product.slug}`}>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={300}
						height={300}
						priority={true}
						className="transition-transform duration-300 hover:scale-105 rounded-md"
					/>
				</Link>
			</CardHeader>
			<CardContent className="p-4 grid gap-4">
				<div className="text-xs">{product.brand}</div>
				<Link href={`/product/${product.slug}`}>
					<h2 className="text-sm font-medium">{product.name}</h2>
				</Link>
				<div className="flex-between gap-4">
					<p>{product.rating} Stars</p>
					{product.stock > 0 ? (
						<ProductPrice
							value={Number(product.price)}
							className="text-primary"
						/>
					) : (
						<p className="text-destructive"> Out of Stock</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
