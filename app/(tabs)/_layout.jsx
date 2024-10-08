import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="trips" />
            <Tabs.Screen name="discover" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
