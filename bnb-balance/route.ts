import axios from "axios";

/**
 * Connect wallet
 * @param request
 * @returns
 */

export async function GET(request: Request) {
  const headers = request.headers;
  try {
    const rs = await axios.get(`https://api.bscscan.com/api`, {
      params: {
        module: "account",
        action: "balance",
        address: headers.get("address"),
        apiKey: process.env.BSC_API_KEY,
      },
    });
    //@ts-ignore
    return Response.json({
      status: 200,
      message: "Success",
      data: rs.data.result,
    });
  } catch (error) {
    console.log("error to get bnb balance", error);
    //@ts-ignore
    return Response.json({
      status: 500,
      message: "Fail",
      data: error,
    });
  }
}

export const dynamic = "force-dynamic";