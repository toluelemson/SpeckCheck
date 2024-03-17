import React, { useState } from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormLabel,
    Input,
    Stack,
    Checkbox, Text, Link, Icon, Textarea,
} from "@chakra-ui/react";
import { postFeedback } from "../../services/client";
import { errorNotification } from "../../services/notification";
import { useParams } from "react-router-dom";
import {FiUserPlus} from "react-icons/fi";

interface MyTextInputProps {
    label: string;
    name: string;
    id?: string;
    type?: string;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ label, type = "text", ...props }) => {
    const [field, meta] = useField(props);

    const InputOrTextarea = type === "textarea" ? Textarea : Input;

    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <InputOrTextarea className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

interface FeedbackFormProps {
    updateRequest?: () => void;
    senderName?: string;
    senderMessage?: string;
    requestId?: string;

    recipientName?: string;
    requestMessage?: string;
    handleFeedbackSubmit: Function
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ handleFeedbackSubmit , requestId, recipientName}) => {
    const [isRequestCreated, setIsRequestCreated] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const { code } = useParams<{ code: string }>();
    const [isRequestAvailable] = useState<boolean>(!!code);

    if (!isRequestAvailable) {
        return (
            <Box my={4}>
                <Alert status="info">
                    <AlertIcon />
                    Oops! No feedback request found. Please ensure you've accessed the correct link or contact support.
                </Alert>
            </Box>
        );
    }

    return (
        <Formik
            initialValues={{
                senderName: '',
                senderMessage: '',
                senderMessage2: ''
            }}
            validationSchema={Yup.object({
                senderName: Yup.string()
                    .max(50, 'Must be 50 characters or less')
                    .when('isAnonymous', {
                        is: false, // Check if 'isAnonymous' is false
                        then: Yup.string().required('Required'), // If 'isAnonymous' is false, 'senderName' is required
                        otherwise: Yup.string().notRequired() // If 'isAnonymous' is true, 'senderName' is not required
                    }),
                senderMessage: Yup.string()
                    .max(500, 'Must be 500 characters or less')
                    .required('Required'),

                senderMessage2: Yup.string()
                    .max(500, 'Must be 500 characters or less')
                    .required('Required')
            })}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                if(requestId) {
                    postFeedback(requestId, values)
                        .then(() => {
                            setIsRequestCreated(true);
                            handleFeedbackSubmit();
                        })
                        .catch(err => {
                            errorNotification("Ops", err.message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <Stack spacing={"24px"}>
                        <Checkbox
                            isChecked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                        >
                            Send Anonymously
                        </Checkbox>
                        {!isAnonymous && (
                            <MyTextInput
                                label="Sender Name"
                                name="senderName"
                                type="text"
                            />
                        )}
                        <MyTextInput
                            label= {`What strengths have you observed in ${recipientName}?`}
                            name="senderMessage"
                            type="textarea"
                        />

                        <MyTextInput
                            label={`In which areas do you believe ${recipientName} could improve?`}
                            name="senderMessage2"
                            type="textarea"
                        />

                        {/*<MyTextInput*/}
                        {/*    label={`Can you provide a specific example where ${recipientName} displayed a notable strength or area?`}*/}
                        {/*    name="example"*/}
                        {/*    type="textarea"*/}
                        {/*/>*/}
                        {isRequestCreated ? null : (
                            <Button type="submit" isLoading={isSubmitting} disabled={!isValid}>
                                Send Feedback
                            </Button>
                        )}
                    </Stack>
                    {isRequestCreated && (
                        <Box textAlign="center">
                            <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={4}>
                                🎉 Your feedback is sent! 🎉
                            </Text>
                            <Text fontSize="xl" color="gray.600" mb={6}>
                                Curious about what others might say about you?
                            </Text>
                            <Link as={Button} colorScheme="teal" href="/register" size="lg" mb={3}>
                                Join the Community &nbsp;<Icon as={FiUserPlus} />
                            </Link>
                            <Text fontSize="md" color="gray.500" mt={4}>
                                Already with us? <Link color="teal.500" href="/login">Login</Link> to get feedback from your peers.
                            </Text>
                            <Text fontSize="sm" color="gray.500" mt={4}>
                                Sharing is caring, and every feedback makes our community a better place!
                            </Text>
                        </Box>
                    )}
                </Form>
            )}
        </Formik>
    );
};
