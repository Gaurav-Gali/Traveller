import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";

// Component Imports
import AuthComp from "@/components/AuthComp";

// Firebase Imports
import { auth } from "@/config/FirebaseConfig";
import { Redirect } from "expo-router";

export default function Index() {
    const [User, setUser] = React.useState<any>(null);
    useEffect(() => {
        setUser(auth.currentUser);
    }, []);

    return (
        <SafeAreaView>
            {User ? <Redirect href="/trips" /> : <AuthComp />}
        </SafeAreaView>
    );
}
