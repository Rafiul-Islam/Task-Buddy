"use client";

import {SessionProvider} from "next-auth/react";
import {PropsWithChildren} from "react";

const AuthProvider = ({children}: PropsWithChildren) => {
  return (
    <SessionProvider refetchInterval={+process.env.NEXT_PUBLIC_REFRESH_INTERVAL_SEC!} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;