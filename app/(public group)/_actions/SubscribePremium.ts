"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SubscribePremium = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    // throw new Error("User Not Logged In!");

    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/subscription/checkout`,
    {
      method: "POST",
      headers: {
        // Authorization : accessToken as unknown as string,
        // Authorization : `${accessToken}`,
        // Authorization : `Bearer ${accessToken}`

        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (result.success && result.data.paymentUrl) {
    console.log(result.data.paymentUrl)
    redirect(result.data.paymentUrl);
  }

};
