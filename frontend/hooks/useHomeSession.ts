import { useState } from "react";
import { clearCurrentSessionUser, getCurrentSessionUser } from "@/lib/session";

export type LoggedInUser = {
    fullName: string;
    email: string;
    createdAt: string;
};

export function useHomeSession() {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(() => getCurrentSessionUser());

    const handleLogout = () => {
        clearCurrentSessionUser();
        setLoggedInUser(null);
    };

    return {
        loggedInUser,
        handleLogout
    };
}