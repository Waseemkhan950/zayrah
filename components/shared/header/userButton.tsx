import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./signoutButton";

const UserButton = async () => {
	const session = await auth();
	if (!session?.user) {
		return (
			<Button asChild>
				<Link href="/sign-in">
					<UserIcon />
					Sign In
				</Link>
			</Button>
		);
	}
	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";
	return (
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center">
						<Button
							variant={"ghost"}
							className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center">
							{firstInitial}
						</Button>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{session.user?.name}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{session.user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuItem>
						<Link href="/user/orders" className="w-full">
							Orders history
						</Link>
					</DropdownMenuItem>
					{session.user?.role === "admin" && (
						<>
							<DropdownMenuItem>
								<Link href="/admin/overview" className="w-full">
									Dashboard
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/admin/products" className="w-full">
									Products
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/admin/orders" className="w-full">
									Orders
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/admin/users" className="w-full">
									Users
								</Link>
							</DropdownMenuItem>
						</>
					)}
					<DropdownMenuItem>
						<Link href="/user/profile" className="w-full">
							Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="p-0 mb-1">
						<SignOutButton />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserButton;
