"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidateTag("my-profile", "max");
};

export default logout;
