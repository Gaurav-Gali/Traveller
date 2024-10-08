import React, { useState, useEffect } from "react";
import {
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Text,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";

// Firebase Imports
import { auth } from "@/config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Formik & Yup Imports
import { Formik } from "formik";
import { object, string, ref } from "yup";

const SignUp = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const router = useRouter();

    // States
    const [userAlreadyExists, setUserAlreadyExists] = React.useState(false);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    // Handlers
    const onUserCreation = async (values) => {
        setIsLoading(true);
        const email = values.email;
        const password = values.password;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setUserAlreadyExists(false);
            setInvalidEmail(false);
            router.replace("/trips");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/invalid-email") {
                setInvalidEmail(true);
            }
            if (error.code === "auth/email-already-in-use") {
                setUserAlreadyExists(true);
            }
        }
        setIsLoading(false);
    };

    // Yup Schema
    let signUpSchema = object({
        name: string().required("Name is required"),
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
        confirmPassword: string()
            .oneOf([ref("password"), null], "Passwords must match") // Ensures the password matches confirmPassword
            .required("Please confirm your password"),
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        onSubmit={(values) => onUserCreation(values)}
                        validationSchema={signUpSchema}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                        }) => (
                            <View className="p-5">
                                <Text className="font-[playfair-medium] mt-5 text-2xl">
                                    Let's create a Traveller account for you
                                </Text>
                                <View className="border-gray-900 border-t-[0px] w-full">
                                    <View className="mt-5">
                                        <View className="w-full">
                                            <Text className="font-[roboto] ml-1 mb-1">
                                                Name
                                            </Text>
                                            <TextInput
                                                className="font-[roboto] p-3 h-[50px] rounded-lg border"
                                                placeholder="Enter your name"
                                                placeholderTextColor="#ccc"
                                                onChangeText={handleChange(
                                                    "name"
                                                )}
                                                onBlur={handleBlur("name")}
                                                value={values.name}
                                            />
                                            {errors.name && (
                                                <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                                    {errors.name}
                                                </Text>
                                            )}
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
                                                placeholderTextColor="#ccc"
                                                onChangeText={handleChange(
                                                    "email"
                                                )}
                                                onBlur={handleBlur("email")}
                                                value={values.email}
                                            />
                                            {errors.email &&(
                                                <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                                    {errors.email}
                                                </Text>
                                            )}
                                            {invalidEmail && (
                                                <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                                    This email does not exist
                                                </Text>
                                            )}
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
                                                placeholderTextColor="#ccc"
                                                onChangeText={handleChange(
                                                    "password"
                                                )}
                                                onBlur={handleBlur("password")}
                                                value={values.password}
                                            />
                                            {errors.password && (
                                                <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                                    {errors.password}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View className="mt-5">
                                        <View className="w-full">
                                            <Text className="font-[roboto] ml-1 mb-1">
                                                Confirm Password
                                            </Text>
                                            <TextInput
                                                secureTextEntry={true}
                                                className="font-[roboto] p-3 h-[50px] rounded-lg border border-gray-600"
                                                placeholder="Re-Enter your password"
                                                placeholderTextColor="#ccc"
                                                onChangeText={handleChange(
                                                    "confirmPassword"
                                                )}
                                                onBlur={handleBlur(
                                                    "confirmPassword"
                                                )}
                                                value={values.confirmPassword}
                                            />
                                            {errors.confirmPassword && (
                                                <Text className="font-[roboto] ml-1 mt-1 text-red-600">
                                                    {errors.confirmPassword}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    {userAlreadyExists && (
                                        <Text className="font-[roboto] text-center mt-5 text-red-600">
                                            It seems like your account is
                                            already registered with us
                                        </Text>
                                    )}
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        className="mt-5 p-3 h-12  flex items-center justify-center bg-gray-900 w-full rounded-lg border border-gray-900"
                                    >
                                        <Text className="font-[roboto] text-gray-100">
                                            {isLoading ? (
                                                <ActivityIndicator size="small" />
                                            ) : (
                                                "Sign Up"
                                            )}
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
                        )}
                    </Formik>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUp;
