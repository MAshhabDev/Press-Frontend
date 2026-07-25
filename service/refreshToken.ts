"use server";

import { cookies } from "next/headers";

const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return {
      success: false,
      message: "RefreshToken Did Not Found!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,

    {
      method: "POST",
      headers: {
        // Authorization : accessToken as unknown as string,
        // Authorization : `${accessToken}`,
        // Authorization : `Bearer ${accessToken}`

        Cookie: `refreshToken=${refreshToken}`,
      },

      cache: "no-cache",
    },
  );

  const result = await res.json();

  return result;
};

export default getNewAccessToken;
