import withErrorHandler from "@/libraries/exception-handler/withErrorHandler";

// const updateValidate = Yup.object({
// 	client_payment_status: Yup.string()
// 		.oneOf([
// 			$Enums.NODE_PACKAGE_HISTORY_PAYMENT_STATUS.FAILED,
// 			$Enums.NODE_PACKAGE_HISTORY_PAYMENT_STATUS.SUCCESS
// 		])
// 		.nullable(),
// 	transaction_hash: Yup.string()
// 		.matches(
// 			/^0x([A-Fa-f0-9]{64})$/,
// 			"transaction_hash is invalid"
// 		)
// 		.nullable(),
// });

export const PATCH = withErrorHandler(async (request: Request) => {
	// const {user: wallet} = (await getServerSession(authOptions)) as Session;
	//
	// const requestData = await request.json();
	//
  // const dataUpdate = await updateValidate.validate(requestData);
	//
  // await prisma.mongodbClient.node_purchased_history.updateMany({
	// 	where: {
	// 		wallet_address: wallet.address,
	// 		payment_status: $Enums.NODE_PACKAGE_HISTORY_PAYMENT_STATUS.PENDING,
	// 	},
	// 	data: dataUpdate as any,
	// })

	return Response.json({
		status: 200,
		message: "Success",
		data: {},
	});
});

export const dynamic = "force-dynamic";