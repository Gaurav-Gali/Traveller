import React, { useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

const AuthComp = () => {
    const router = useRouter();

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View className="h-full w-fit flex flex-col items-center justify-between">
            <View className="h-[25vh] w-full flex items-center justify-end">
                <Text className="font-[playfair-bold] text-gray-900 text-5xl">
                    Traveller
                </Text>
            </View>

            <View className="h-full w-full flex items-center p-5 gap-5">
                <View className="w-full">
                    <Text className="font-[roboto] ml-1 mb-1">Email</Text>
                    <TextInput
                        className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                        placeholder="Enter your email"
                    />
                </View>
                <View className="w-full">
                    <Text className="font-[roboto] ml-1 mb-1">Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                        placeholder="Enter your password"
                    />
                </View>
                <TouchableOpacity className="p-3 h-12  flex items-center justify-center bg-gray-900 w-full rounded-lg border border-gray-900">
                    <Text className="font-[roboto] text-gray-100">Sign in</Text>
                </TouchableOpacity>
                <View className="border-gray-600 border-t-[0.2px] w-full flex items-center justify-center">
                    <Text className="font-[playfair-medium] w-full mt-5 text-lg text-center">
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("auth/signup")}
                        className="p-3 h-12 mt-3 flex items-center justify-center bg-gray-200 w-full rounded-lg border border-gray-600"
                    >
                        <Text className="font-[roboto] text-gray-600">
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AuthComp;
