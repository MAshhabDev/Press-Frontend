import getMe from "@/service/getMe";
import React from "react";

const authLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return;
  <>{children}</>;
};

export default authLayout;
