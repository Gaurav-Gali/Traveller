import React, { useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import {
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";

// Firebase Imports
import { auth } from "@/config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Formik & Yup Imports
import { Formik } from "formik";
import { object, string } from "yup";

const AuthComp = () => {
    const router = useRouter();

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // States
    const [validCredentials, setValidCredentials] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Handlers
    const onSignIn = async (values) => {
        setIsLoading(true);
        const email = values.email;
        const password = values.password;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setValidCredentials(true);
            router.replace("/(tabs)/trips");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setValidCredentials(false);
            }
        }
        setIsLoading(false);
    };

    // Yup Schema
    let signInSchema = object({
        email: string().email().required("Please enter a valid email"),
        password: string()
            .min(8, "Password must be at least 8 characters long") // Minimum length
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            ) // At least one uppercase letter
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            ) // At least one lowercase letter
            .matches(/[0-9]/, "Password must contain at least one number") // At least one number
            .matches(
                /[@$!%*#?&]/,
                "Password must contain at least one special character"
            ) // At least one special character
            .required("Password is required"),
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values) => onSignIn(values)}
                    validationSchema={signInSchema}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                    }) => (
                        <View className="h-[100vh] w-full flex flex-col items-center justify-start pt-[20vh]">
                            <View className="w-full flex items-center justify-center">
                                <Text className="font-[playfair-bold] text-gray-900 text-5xl">
                                    Traveller
                                </Text>
                            </View>

                            <View className="w-full flex items-center p-5 gap-5">
                                <View className="w-full">
                                    <Text className="font-[roboto] ml-1 mb-1">
                                        Email
                                    </Text>
                                    <TextInput
                                        className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                                        placeholder="Enter your email"
                                        placeholderTextColor="#ccc"
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                    {errors.email && (
                                        <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                            {errors.email}
                                        </Text>
                                    )}
                                </View>
                                <View className="w-full">
                                    <Text className="font-[roboto] ml-1 mb-1">
                                        Password
                                    </Text>
                                    <TextInput
                                        secureTextEntry={true}
                                        className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                                        placeholder="Enter your password"
                                        placeholderTextColor="#ccc"
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                    />
                                    {errors.password && (
                                        <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                            {errors.password}
                                        </Text>
                                    )}
                                </View>
                                {!validCredentials && (
                                    <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                        Either email or password is incorrect
                                    </Text>
                                )}
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    className="p-3 h-12  flex items-center justify-center bg-gray-900 w-full rounded-lg border border-gray-900"
                                >
                                    <Text className="font-[roboto] text-gray-100">
                                        {isLoading ? (
                                            <ActivityIndicator size={"small"} />
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                                <View className="border-gray-600 border-t-[0.2px] w-full flex items-center justify-center">
                                    <Text className="font-[playfair-medium] w-full mt-5 text-lg text-center">
                                        Don't have an account?
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push("auth/signup")
                                        }
                                        className="p-3 h-12 mt-3 flex items-center justify-center bg-gray-200 w-full rounded-lg border border-gray-600"
                                    >
                                        <Text className="font-[roboto] text-gray-600">
                                            Sign up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </ScrollView>
    );
};

export default AuthComp;
