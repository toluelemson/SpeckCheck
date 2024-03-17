import React, { useState } from "react";
import { Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormLabel,
    Input,
    Stack,
    Tooltip,
    useToast
} from "@chakra-ui/react";

import {MyTextInputProps, requestFeedback, updateRequestById} from "../../services/client";
const MyTextInput: React.FC<MyTextInputProps> = ({ label, as: ComponentType = 'input', size, placeholder, ...props }) => {
    const [field, meta ] = useField(props);
    // const { size, ...restProps } = props;

    return (
        <Box my={4}>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Tooltip label="Ensure your request message in clear and concise" aria-label="A tooltip">
                <Input
                    className="text-input"
                    {...field}
                    {...props}
                    borderColor={meta.touched && meta.error ? 'red.300' : 'gray.300'}
                />

            </Tooltip>
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};


interface  RequestFeedbackFormProps {
    updateRequest? : () => void,
    requestId? : string,
    requestMessage?: string
}
const RequestFeedbackForm: React.FC<RequestFeedbackFormProps> = ({
                                                                     updateRequest,
                                                                     requestId,
                                                                     requestMessage,
                                                                 }) => {
    const [isRequestCreated, setIsRequestCreated] = useState(false);
    const toast = useToast();

    // const initialMessage = 'I\'m on a mission to upgrade my "personal software". 🖥️ Could you share one thing you admire about me and one area for an update? Your insights are like gold!\n' +
    //     '\n' +
    //     ''

    const initialMessage2 = "Hi,\n" +
        "\n" +
        "I'm on a mission to upgrade my \"personal software\". 🖥️ Could you share one thing you admire about me and one area for an update? Your insights are like gold!\n" +
        "\n" +
        "Thanks,\n";


    // @ts-ignore
    // @ts-ignore
    return (
        <Formik
            initialValues={{ message: requestMessage || initialMessage2  }}
            validationSchema={Yup.object({
                message: Yup.string()
                    .max(1000, 'Must be 500 characters or less')
                    .required('Required'),
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                setSubmitting(true);

                try {
                    if (!requestId) {
                        await requestFeedback(values);
                        toast({
                            title: "Request created",
                            description: "Your feedback request has been created successfully.",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        });
                        setIsRequestCreated(true);
                        if (updateRequest) {
                            updateRequest();
                        }
                    } else {
                        await updateRequestById(requestId, values);
                        toast({
                            title: "Request updated",
                            description: "Your feedback request has been updated successfully.",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        });
                        if (updateRequest) {
                            updateRequest();
                        }
                    }
                } catch (err) {
                    if (err){
                    toast({
                        title: "Error",
                        // description: err?.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })}
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing={"24px"}>
                        <MyTextInput
                            type="text"
                            style={{ fontSize: '18px', width: '90%', height: '10%' }}
                            label="Create a Request Card"
                            name="message"
                            as="textarea"
                            rows={3}
                            placeholder={requestMessage}
                        />
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={!isValid}
                            _hover={{ bg: requestId ? "blue.500" : "green.500" }}
                            _active={{ bg: requestId ? "blue.700" : "green.700" }}
                        >
                            {requestId ? 'Update Request' : 'Create Request'}
                        </Button>
                    </Stack>

                    {isRequestCreated && (
                        <Box mt={4}>
                            <Alert status="success">
                                <AlertIcon />
                                Request successfully created!
                            </Alert>
                        </Box>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default RequestFeedbackForm;
