import { getOrderById } from "@/lib/actions/order-actions";
import OrderDetailTable from "./order-detail-table";
import { ShippingAddress } from "@/types/validators";
import { auth } from "@/auth";

export const metadata = {
	title: "Order details",
};
const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const order = await getOrderById(id);
	const paypalClientId = process.env.PAYPAL_CLIENT_ID || "sb";
	const session = await auth();
	return (
		<div>
			<OrderDetailTable
				order={{
					...order,
					shippingAddress: order?.shippingAddress as ShippingAddress,
				}}
				paypalClientId={paypalClientId}
				isAdmin={session?.user?.role === "admin" ? true : false}
			/>
		</div>
	);
};

export default OrderDetailsPage;
