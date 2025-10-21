"use client";

import {PropsWithChildren, useEffect, useRef, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {AUTH_ROUTES} from "@/constants/auth";
import {ERROR_TYPE_TO_FORCE_LOGOUT} from "@/types/auth";
import {toast} from "react-toastify";

const SessionGuard = ({children}: PropsWithChildren) => {
  const {data: session, status} = useSession();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSignedOut = useRef(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasSignedOut.current) return;
    if (status !== "authenticated") return;

    if (session?.error === ERROR_TYPE_TO_FORCE_LOGOUT) {
      setLoading(true);
      toast.info("Session expired. Signing out...");
      timerRef.current = setTimeout(() => {
        hasSignedOut.current = true;
        signOut({
          callbackUrl: AUTH_ROUTES.SIGN_IN,
          redirect: true,
        });
        setLoading(false);
      }, 4000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [session?.error, status]);

  return (
    <div className={`${loading ? "pointer-events-none" : ""}`}>
      {children}
    </div>
  );
};

export default SessionGuard;