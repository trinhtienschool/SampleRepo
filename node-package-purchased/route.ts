import prisma from "@/libraries/prisma/dbConnect";
import { authOptions } from "@/services/auth/authOption";
import { Session, getServerSession } from "next-auth";
import withErrorHandler from "@/libraries/exception-handler/withErrorHandler";
import { $Enums } from "@/libraries/prisma/generated/client-mongodb";
import crypto from 'crypto'

export const GET = withErrorHandler(async (request: Request) => {
	const { user: wallet } = (await getServerSession(authOptions)) as Session;

	const nodesPurchased = await prisma.mongodbClient.node_purchased_history.findMany({
		where: {
			wallet_address: wallet.address,
			type: $Enums.NODE_PACKAGE_TYPE.PURCHASE,
		},
		select: {
			id: true,
			node_package_id: true,
			name: true,
			price: true,
			wattage: true,
			end_time: true,
			payment_status: true,
			ucon_number: true,
			type: true
		},
		orderBy: {
			id: "desc"
		},
	})

	const nodePackageTransformer = nodesPurchased.map((nodePackage) => {
		const isBonusESim = nodePackage.price >= 500;
		const sign = nodePackage.ucon_number === null && isBonusESim && nodePackage.type === "PURCHASE" && nodePackage.payment_status === "SUCCESS"
			? encryptData(JSON.stringify({
				wallet_address: wallet.address,
				node_purchased_history_oid: nodePackage.id
			}))
			: null;

		return {
			...nodePackage,
			sign: sign
		};
	})

	return Response.json({
		status: 200,
		message: "Success",
		data: nodePackageTransformer,
	});
});

const encryptData = (planText: string) => {
	const key = process.env.SIGN_WALLET_ADDRESS_SECRET_KEY
	const iv = key.substring(16, 32)
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
	let encrypted = cipher.update(planText, 'utf8', 'base64')
	encrypted += cipher.final('base64')

	return Buffer.from(encrypted, 'base64').toString('hex')
}

export const dynamic = "force-dynamic";