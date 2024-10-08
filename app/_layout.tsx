import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
    //Defining fonts
    useFonts({
        // Playfair Display
        "playfair": require("../assets/fonts/playfair_display/PlayfairDisplay-Regular.ttf"),
        "playfair-medium": require("../assets/fonts/playfair_display/PlayfairDisplay-Medium.ttf"),
        "playfair-bold": require("../assets/fonts/playfair_display/PlayfairDisplay-Bold.ttf"),

        // Roboto
        "roboto": require("../assets/fonts/roboto/Roboto-Regular.ttf"),
        "roboto-medium": require("../assets/fonts/roboto/Roboto-Medium.ttf"),
        "roboto-bold": require("../assets/fonts/roboto/Roboto-Bold.ttf"),
    });

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
