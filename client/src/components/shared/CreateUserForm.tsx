import React, {FC, useState} from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Stack } from "@chakra-ui/react";
import { registerUser } from "../../services/client";
interface FormFieldProps {
    label: string;
    id?: string;
    name: string;
    type: string;
    placeholder: string;
}

const MyTextInput: FC<FormFieldProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status="error" mt={2}>
                    <AlertIcon />
                    Oops! {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

interface CreateUserFormProps {
    onSuccess: (token: string) => void;
}

interface ResponseData {
    message: string;
    data: {
        access_token: string;
    };
}

const CreateUserForm: FC<CreateUserFormProps> = ({ onSuccess }) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null); // <-- Add this state variable
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // <-- Add this state variable

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().max(15, 'Keep it to 15 characters or less').required('Can’t forget this!'),
                lastName: Yup.string().max(15, '15 characters max').required('Need this!'),
                email: Yup.string().email('This doesn’t look like an email').required('Gotta have it!'),
                password: Yup.string().min(4, 'At least 4 characters').max(15, '15 characters max!').required('don’t leave this empty!')
            })}
            onSubmit={(user, { setSubmitting }) => {
                setSubmitting(true);
                registerUser(user)
                    .then((res) => {
                        // const responseData = res as ResponseData;
                        const message = "You're in! Check your email 🚀";
                        setSuccessMessage(message);
                    })
                    .catch(err => {
                        const errorText = err.response?.data || "An error occurred.";
                        setErrorMessage(errorText); // <-- Set the error message
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing="24px">
                        {errorMessage && (
                            <Alert className="error" status="error" mt={2}>
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}
                        {successMessage && (
                            <Alert className="success" status="success" mt={2}>
                                <AlertIcon />
                                {successMessage}
                            </Alert>
                        )}
                        <MyTextInput label="First Name" name="firstName" type="text" placeholder="Tony" />
                        <MyTextInput label="Last Name" name="lastName" type="text" placeholder="Stark" />
                        <MyTextInput label="Email Addy 💌" name="email" type="email" placeholder="you@speckcheck.ee" />
                        <MyTextInput label="Secret Code 🤫" name="password" type="password" placeholder="make it secret, make it safe" />

                        <Button disabled={!isValid || isSubmitting} type="submit">Let’s Go!</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default CreateUserForm;
