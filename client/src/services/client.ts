import axios from 'axios';
import {FormikValues} from "formik";
import React from "react";

type RegisteredUser = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
};

type FeedbackRequest = {
    message: string;
};

export type FeedbackResponseData = {
    feedbackId: string
    
    // message: string;
    // data: {}
    access_token: string
};

export type ApiResponse = {
    feedbackId: string;
    senderName: any;
    feedbackDate: any;
    senderMessage: any;
    senderMessage2: any;
    data: FeedbackResponseData;
    map: any

};

type User = {
    email: string;
    password: string;
};

type FeedbackFormDetails = {
    name: string;
    message: string;
};

type FeedbackResponse = {
    success: boolean;
    message: string;
    // ... add more fields based on the response structure
};

export interface MyTextInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    name: string;
    type: "email" | "password" | "text" | string;
    placeholder: string | any;
    id?: string;
    as?: 'input' | 'textarea';
    rows?: number;
}


export interface FeedbackShowProps {
    id?: string;
    senderName: string;
    feedbackDate: string;
    senderMessage: string;
    map?: []
}

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getFeedbacks = async (id: Request): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/all/${id}`
        );
        return response && response.data;
    } catch (e) {
        throw e;
    }
};
export const postFeedback = async (id: string, message: FormikValues): Promise<ApiResponse> => {
    console.log(message)
    try {
        const response = await axios.post<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/s/${id}`,
            message
        );
        return response && response.data;
    } catch (e) {
        throw e;
    }
};

export const deleteFeedback = async (id: string): Promise<any> => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/1/${id}`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const fetchRequestDetails = async (id: string | undefined): Promise<FeedbackResponseData> => {

    try {
        const response = await axios.get<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/request/${id}`,
        );
        return response.data.data ?? response.data;
    } catch (e) {
        throw e;
    }
};

export const getRequests = async (id: string | undefined): Promise<FeedbackResponseData> => {
    try {
        const response = await axios.get<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/user/${id}`,
            getAuthConfig()
        );
        return response.data.data ?? response.data;
    } catch (e) {
        throw e;
    }
};

export const registerUser = async (user: User): Promise<RegisteredUser> => {
    try {
        const response = await axios.post<RegisteredUser>(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
            user
        );
        return response && response.data;
    } catch (e) {
        throw e;
    }
};

export const requestFeedback = async ({ message }: FeedbackRequest): Promise<FeedbackResponseData | ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/request`,
            { requestMessage: message },
            getAuthConfig()
        );
        return response.data.data ?? response.data;
    } catch (e) {
        throw e;
    }
};

export const deleteRequest = async (id: string): Promise<any> => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/request/${id}`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const updateRequestById = async (id: string, feedback: FormikValues): Promise<FeedbackResponseData | ApiResponse> => {
    console.log(id, feedback)
    try {
        const response = await axios.put<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/feedback/request/${id}`,
            { requestMessage: feedback.message },
            getAuthConfig()
        );
        return response.data.data ?? response.data;
    } catch (e) {
        throw e;
    }
};

export const login = async (credentials: User | undefined): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/authenticate`,
            credentials
        );
        return response.data ?? response;
    } catch (e) {
        throw e;
    }
};
