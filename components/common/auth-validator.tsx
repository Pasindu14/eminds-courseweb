import { supabase, supabaseCacheFreeClient } from "@/server/server";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const AuthSessionValidator = ({ userId }: { userId: string }) => {
  const { data: session }: any = useSession();

  const handleRecordUpdated = (payload: any) => {};

  useEffect(() => {
    try {
      const channels = supabase
        .channel("custom-update-channel")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "user_sessions",
            filter: "user_id=eq." + userId,
          },
          (payload) => {
            if (session.accessToken != payload.new.session_token) {
              signOut();
            }
          }
        )
        .subscribe();

      return () => {
        channels.unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  }, [userId, session.accessToken]);

  return (
    <div>
      <h2>Listening for Updates on Country with ID {userId}</h2>
    </div>
  );
};

export default AuthSessionValidator;
