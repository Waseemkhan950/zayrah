import loader from "@/assets/loader.gif";
import Image from "next/image";
const LoadingPage = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
			}}>
			<Image
				src={loader}
				width={150}
				height={150}
				alt="loading..."
				priority={true}
			/>
		</div>
	);
};

export default LoadingPage;
