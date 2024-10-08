import { initializeApp } from "firebase/app";

// Env imports
import {
    firebase_api_key,
    firebase_auth_domain,
    firebase_project_id,
    firebase_storage_bucket,
    firebase_message_sender_id,
    firebase_app_id,
    firebase_measurement_id,
} from "@env";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: firebase_api_key,
    authDomain: firebase_auth_domain,
    projectId: firebase_project_id,
    storageBucket: firebase_storage_bucket,
    messagingSenderId: firebase_message_sender_id,
    appId: firebase_app_id,
    measurementId: firebase_measurement_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);