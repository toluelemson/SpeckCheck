import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import {
    Box, Center, Flex, Text, Icon, useColorModeValue, Container,
    Spinner, Alert, AlertIcon, Heading, Button, Link,
} from "@chakra-ui/react";
import { FiCalendar, FiMail, FiUserPlus } from "react-icons/fi";
import { FeedbackForm } from "./FeedbackForm";
import { fetchRequestDetails } from "../../services/client";
import QRCode from "qrcode.react";

type FeedbackResponseData = {
    requestId?: string;
    requestMessage?: string;
    recipientName: string;
    requestDate: string;
};


const fullURL = `${window.location.origin}${location.pathname}`;

export const RequestDetails: React.FC = () => {
    const { id, code } = useParams<{ id: string, code: string }>();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [requestDetails, setRequestDetails] = useState<FeedbackResponseData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setError] = useState<Error | null>(null);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

    const handleFeedbackSubmit = () => {
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const fetchRequest = async (requestId: string) => {
            try {
                const res = await fetchRequestDetails(requestId);
                if ('recipientName' in res && 'requestDate' in res) {
                    setRequestDetails(res as any);
                } else {
                    setRequestDetails(null); // No details found
                }
            } catch (error: any) {
                setError(error);
                //errorNotification(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest(code as any);
    }, [id, code, isModalOpen]);

    const { requestMessage, recipientName, requestDate, requestId } = requestDetails || {};

    return (
        <Container maxW="container.xl">
            <Center py={8}>
                <Flex
                    w="full"
                    p={4}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="xl"
                    rounded="lg"
                    direction="column"
                    maxW="md"
                >
                    {loading && (
                        <Center mt={4}>
                            <Spinner />
                        </Center>
                    )}
                    {err && (
                        <Alert status="error" borderRadius="lg">
                            <AlertIcon />
                            An error occurred.
                        </Alert>
                    )}
                    {requestDetails ? (
                        <>
                            <Center flexDir="column" mb={6}>
                                <Heading as="h2" size="lg" mb={4} color="gray.700">
                                    SpeckCheck
                                </Heading>
                                <Text fontSize="xl" color="gray.600" mb={2}>
                                    <Flex align="center">
                                        <Icon as={FiMail} boxSize={6} mr={2} />
                                        {requestMessage} From, {recipientName}.
                                    </Flex>
                                </Text>
                                <Text fontSize="xl" color="gray.600">
                                    <Flex align="center">
                                        <Icon as={FiCalendar} boxSize={6} mr={2} />
                                        {requestDate}
                                    </Flex>
                                </Text>
                                    <Heading size="md" mb={4} color="gray.700">
                                       .
                                    </Heading>
                                    <QRCode value={fullURL} size={128} />

                            </Center>
                            <FeedbackForm handleFeedbackSubmit={handleFeedbackSubmit} requestId={requestId} recipientName={recipientName}/>
                        </>

                    ) : (
                        <Box textAlign="center">
                            <Text fontSize="lg" color="gray.700" mb={4}>
                                🙅‍♀️ Oops, this request doesn't seem to be around anymore. Maybe it went to a secret hideout? 🕵️‍♂️
                            </Text>
                            <Link as={Button} colorScheme="teal" size="lg" href="/register">
                                Create Your Own Request &nbsp;<Icon as={FiUserPlus} />
                            </Link>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                Don't have an account? No worries, you can still create one and be part of the cool crowd!
                            </Text>
                        </Box>
                    )}
                </Flex>
            </Center>
        </Container>
    );
};
