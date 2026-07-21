import React from "react";

const AuthorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      Author Layout Is Special Only For Author Route Or Nested Routes Inside The
      Author Directory
      {children}
    </div>
  );
};

export default AuthorLayout;
