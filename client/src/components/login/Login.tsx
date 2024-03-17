// Hey there! Let's dive into some cool code that's all about logging in. 🔑🚀

// First up, we need some helpers from the magical realm of Chakra UI. 🌈✨
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormLabel,
    Heading,
    Image,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';

import {
    Formik,
    Form,
    useField,
    FieldInputProps,
    FieldMetaProps,
    FieldHelperProps,
} from "formik";
import * as Yup from 'yup';
import { useAuth } from "../context/AuthContext";
//import { errorNotification } from "../../services/notification";
import { useNavigate } from "react-router-dom";
import React, {useEffect, FC, useState} from "react";
import { MyTextInputProps } from "../../services/client";

const MyTextInput: FC<MyTextInputProps> = ({ label, size,...props }) => {
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};


// Login Form component
const LoginForm = () => {
    const auth = useAuth();
    //const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // <-- Add this state variable
    //const [successMessage, setSuccessMessage] = useState<string | null>(null); // <-- Add this state variable


    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    email: Yup.string()
                        .email("Gotta use a valid email, okay?")
                        .required("Don't ghost us, email is required"),
                    password: Yup.string()
                        .max(20, "Password is like a tweet, keep it short!")
                        .required("Password, please. 🙏"),
                })
            }
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                if (auth) {
                    auth?.login?.(values)
                        .then((res) => {
                            console.log(res, values);
                            //navigate("/dashboard");
                        })
                        .catch((err) => {
                            console.log(err);
                            const errorMessage = (err.response && err.response.data) || err.message || 'An Error Occurred';
                            if (errorMessage) {
                                setErrorMessage(errorMessage);
                            }
                            throw err; // Watch out for that error wave! 🌊
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack mt={15} spacing={15}>
                        {errorMessage && (
                            <Alert className="error" status="error" mt={2}>
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}
                        <MyTextInput
                            label={"Your Email"}
                            name={"email"}
                            type={"email"}
                            placeholder={"hello@speckcheck.com"}
                        />
                        <MyTextInput
                            label={"Password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"8jhu"}
                        />
                        <Button
                            type={"submit"}
                            disabled={!isValid || isSubmitting}
                        >
                            Login
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}

// Now, get ready to vibe with the login zone! 🎶🌟
const Login: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.user) {
            navigate("/dashboard");
        }
    });

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Image
                        src={""}
                        boxSize={"200px"}
                        alt={"SpeckCheck Logo"}
                        alignSelf={"center"}
                    />
                    <Heading fontSize={'2xl'} mb={15}>Ready to Rock? 🚀</Heading>
                    <LoginForm />
                    <Link color={"blue.500"} href={"/signup"}>
                        New here?
                    </Link>
                </Stack>
            </Flex>
            <Flex
                flex={1}
                p={10}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                bgGradient={{ sm: 'linear(to-r, blue.600, purple.600)' }}
            >
                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    <Link target={"_blank"} href={"#"}>
                        SpeckCheck
                    </Link>
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={''}
                />
            </Flex>
        </Stack>
    );
}
export default Login;
