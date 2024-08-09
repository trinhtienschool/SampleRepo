import connectWalletGetRepo from "@/repositories/connect_wallet/get";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/services/auth/authOption";

/**
 * Connect wallet
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  const { user } = (await getServerSession(authOptions)) as Session;
  const lstWallet = await connectWalletGetRepo(user.address);
  //@ts-ignore
  return Response.json({
    status: 200,
    message: "Success",
    data: lstWallet,
  });
}

export const dynamic = "force-dynamic";