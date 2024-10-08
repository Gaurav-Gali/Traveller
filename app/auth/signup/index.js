import React, { useEffect } from "react";
import { View,TextInput,TouchableOpacity, SafeAreaView, Text } from "react-native";
import { useNavigation, useRouter } from "expo-router";

const SignUp = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const router = useRouter();

    return (
        <SafeAreaView>
            <View className="p-5">
                <Text className="font-[playfair-medium] text-2xl">
                    Let's create a Traveller account for you
                </Text>
                <View className="border-gray-900 mt-5 border-t-[0.2px] w-full">
                    <View className="mt-5">
                        <View className="w-full">
                            <Text className="font-[roboto] ml-1 mb-1">
                                Name
                            </Text>
                            <TextInput
                                className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                                placeholder="Enter your name"
                            />
                        </View>
                    </View>
                    <View className="mt-5">
                        <View className="w-full">
                            <Text className="font-[roboto] ml-1 mb-1">
                                Email
                            </Text>
                            <TextInput
                                className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                                placeholder="Enter your email"
                            />
                        </View>
                    </View>
                    <View className="mt-5">
                        <View className="w-full">
                            <Text className="font-[roboto] ml-1 mb-1">
                                Password
                            </Text>
                            <TextInput
                                secureTextEntry={true}
                                className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                                placeholder="Enter your password"
                            />
                        </View>
                    </View>
                    <TouchableOpacity className="mt-5 p-3 h-12  flex items-center justify-center bg-gray-900 w-full rounded-lg border border-gray-900">
                        <Text className="font-[roboto] text-gray-100">
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <View className="border-gray-900 mt-5 border-t-[0.2px] w-full">
                        <Text className="font-[playfair-medium] w-full mt-5 text-lg text-center">
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="p-3 h-12 mt-3 flex items-center justify-center bg-gray-200 w-full rounded-lg border border-gray-600"
                        >
                            <Text className="font-[roboto] text-gray-600">
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
