import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

const AuthComp = () => {
    return (
        <View className="h-full w-fit flex flex-col items-center justify-between">
            <View className="h-[25vh] w-full flex items-center justify-end">
                <Text className="font-[playfair-bold] text-gray-900 text-5xl">
                    Traveller
                </Text>
            </View>

            <View className="h-full w-full flex items-center p-5 gap-5">
                <TextInput
                    className="font-[roboto] p-3 h-[50px] w-full rounded-lg border border-gray-600"
                    placeholder="Email"
                />
                <TextInput
                    className="font-[roboto] p-3 h-[50px] w-full rounded-lg border border-gray-600"
                    placeholder="Password"
                />
                <TouchableOpacity className="p-3 h-12  flex items-center justify-center bg-gray-900 w-full rounded-lg border border-gray-900">
                    <Text className="font-[roboto] text-gray-100">Sign in</Text>
                </TouchableOpacity>
                <View className="border-gray-600 border-t-[0.2px] w-full flex items-center justify-center">
                    <Text className="font-[playfair-medium] w-full mt-5 text-lg text-center">
                        Don't have an account?
                    </Text>
                    <TouchableOpacity className="p-3 h-12 mt-3 flex items-center justify-center bg-gray-200 w-full rounded-lg border border-gray-600">
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
