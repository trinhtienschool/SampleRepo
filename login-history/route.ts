import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/authOption";
import withErrorHandler from "@/libraries/exception-handler/withErrorHandler";
import prisma from "@/libraries/prisma/dbConnect";

export const GET = withErrorHandler(async (request: Request) => {
  const { user } = (await getServerSession(authOptions)) as Session;
  const { searchParams } = new URL(request.url);
  const limit = Number( searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

  const [histories,total] = await Promise.all([
    prisma.mongodbClient.user_wallet_login_histories.findMany({
      where : {address : user.address},
      orderBy: {created_at: "desc"},
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.mongodbClient.user_wallet_login_histories.count({
      where : {address: user.address}
    })
    ]
  )

  return Response.json({
    status: 200,
    message: "Success",
    data: histories,
    total: total,
  });
})

export const dynamic = "force-dynamic";