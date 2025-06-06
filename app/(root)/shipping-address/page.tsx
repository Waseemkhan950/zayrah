import ShippingAddressForm from "@/components/shared/product/ShippingAddressForm";
import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types/validators";
import CheckoutSteps from "@/components/shared/product/checkout-steps";

export const metadata: Metadata = {
	title: "Shipping address",
};
const ShippingAddressPage = async () => {
	const cart = await getMyCart();
	if (!cart || cart.items.length === 0) return redirect("/cart");
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) throw new Error("No user Id");
	// get user by id
	const user = await getUserById(userId);
	if (!user) throw new Error("User not found");

	return (
		<>
			<CheckoutSteps current={1} />
			<ShippingAddressForm address={user.address as ShippingAddress} />
		</>
	);
};

export default ShippingAddressPage;
