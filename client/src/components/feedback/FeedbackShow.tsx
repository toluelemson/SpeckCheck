import React, {useEffect, useRef, useState} from 'react';
import {
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react';
import {deleteFeedback, getFeedbacks} from "../../services/client";
import {errorNotification, successNotification} from "../../services/notification";


type FeedbackShowProps = {
    request: object | null
}

export default function FeedbackShow({request}: FeedbackShowProps) {
    const { onOpen, onClose} = useDisclosure();
    // const cancelRef = useRef<HTMLButtonElement>(null);
    // const bgColor = useColorModeValue('white', 'gray.800');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [feedbacks, setFeedbacks] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [_, setError] = useState<Error | null>(null);

    const requestIdFunction = async () => {
        const result = await request;
        return result;
    };

    useEffect(() => {
        requestIdFunction()
            .then(async result => {
                if (Array.isArray(result) && result.length > 0 && 'requestId' in result[0]) {
                    const {requestId} = result[0];
                    await fetchFeedbacks(requestId);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [request, isDeleting]);

    const onDeleteFeedback = async (feedbackId: string): Promise<void> => {
        setIsDeleting(true);

        try {
            await deleteFeedback(feedbackId);
            successNotification("Info", "Feedback deleted");
        } catch (error: any) {
            setError(error as Error);
            errorNotification(error.code ?? 'Unknown error', error.message ?? 'Something went wrong.');
        }

        setIsDeleting(false);
    }

    const fetchFeedbacks = async (requestId: any) => {
        setIsLoading(true);
        try {
            const res = await getFeedbacks(requestId);
            setFeedbacks(res as any);
            console.log(res)
        } catch (error: any) {
            setError(error.response || error);
        } finally {
            setIsLoading(false);
        }
    }

    // const shortenFeedbackId = (feedbackId: string) => feedbackId;
    //
    // const handleDeleteFeedback = (feedbackId: string) => {
    //     setIsLoading(true);
    //     onDeleteFeedback(feedbackId).then(() => {
    //         setIsLoading(false);
    //         onClose();
    //     });
    // };

    // const primaryColor = '#FF6347';
    // const secondaryColor = '#5F5AA2';

    return (
        <>

            <div className="container">
                <div className="row justify-content-center">
                    {feedbacks && feedbacks.length > 0 ? (
                        feedbacks.map((speck, index) => (
                            <div key={speck.feedbackId} className="col-12 col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <img className="rounded-circle"
                                             src={`https://api.adorable.io/avatars/285/${speck.feedbackId}.png`}
                                             alt={speck.senderName}/>
                                        <h5 className="card-title">{speck.senderName}</h5>
                                        <p className="card-text">"{speck.senderMessage}"</p>
                                        <p className="card-text">"{speck.senderMessage2}"</p>
                                        <small className="text-muted">{speck.feedbackDate}</small>
                                        <br/>
                                        {isLoading ? (
                                            <button className="btn btn-outline-primary mt-3"
                                                    disabled>Deleting...</button>
                                        ) : (
                                            <button className="btn btn-outline-primary mt-3"
                                                    onClick={onOpen}>Delete</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="card text-center">
                                <div className="card-body">
                                    <p className="card-text">Oops! No feedback today. Why not share a request?</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/*<Flex flexWrap="wrap" justifyContent="center">*/}
            {/*    {feedbacks && feedbacks.length > 0 ? (*/}
            {/*        feedbacks.map((speck, index) => (*/}
            {/*            <WrapItem key={speck.feedbackId} flexBasis="calc(50% - 20px)" margin="10px">*/}
            {/*                <Center py={10}>*/}
            {/*                    <Box*/}
            {/*                        maxW="600px"*/}
            {/*                        minW="550px"*/}
            {/*                        w="full"*/}
            {/*                        p={5}*/}
            {/*                        bg="white"*/}
            {/*                        boxShadow="lg"*/}
            {/*                        rounded="md"*/}
            {/*                        overflow="hidden"*/}
            {/*                        border="1px solid #E2E8F0"*/}
            {/*                    >*/}
            {/*                        <Stack spacing={3} align="center">*/}
            {/*                            <Avatar*/}
            {/*                                size="xl"*/}
            {/*                                name={speck.senderName}*/}
            {/*                                src={`https://api.adorable.io/avatars/285/${shortenFeedbackId(speck.feedbackId)}.png`}*/}
            {/*                            />*/}
            {/*                            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">*/}
            {/*                                {speck.senderName}*/}
            {/*                            </Heading>*/}
            {/*                            <Text color="gray.600">*/}
            {/*                                <Icon as={RiDoubleQuotesL} />*/}
            {/*                                {speck.senderMessage}*/}
            {/*                                <Icon as={RiDoubleQuotesR} />*/}
            {/*                            </Text>*/}
            {/*                            <Text color="gray.600">*/}
            {/*                                <Icon as={RiDoubleQuotesL} />*/}
            {/*                                {speck.senderMessage2}*/}
            {/*                                <Icon as={RiDoubleQuotesR} />*/}
            {/*                            </Text>*/}
            {/*                            <Text fontSize="sm" color="gray.400">*/}
            {/*                                {speck.feedbackDate}*/}
            {/*                            </Text>*/}
            {/*                            {isLoading ? (*/}
            {/*                                <Button*/}
            {/*                                    isLoading*/}
            {/*                                    loadingText="Deleting"*/}
            {/*                                    colorScheme="whiteAlpha"*/}
            {/*                                    variant="outline"*/}
            {/*                                    borderColor="blue.500"*/}
            {/*                                    color="blue.500"*/}
            {/*                                    _hover={{ bg: "blue.500", color: "white" }}*/}
            {/*                                >*/}
            {/*                                    Delete*/}
            {/*                                </Button>*/}
            {/*                            ) : (*/}
            {/*                                <Button*/}
            {/*                                    tabIndex={0}*/}
            {/*                                    aria-label={`Delete feedback from ${speck.senderName}`}*/}
            {/*                                    colorScheme="whiteAlpha"*/}
            {/*                                    variant="outline"*/}
            {/*                                    borderColor="blue.500"*/}
            {/*                                    color="blue.500"*/}
            {/*                                    _hover={{ bg: "blue.500", color: "white" }}*/}
            {/*                                    onClick={onOpen}*/}
            {/*                                >*/}
            {/*                                    Delete*/}
            {/*                                </Button>*/}
            {/*                            )}*/}
            {/*                        </Stack>*/}
            {/*                    </Box>*/}

            {/*                    /!* Delete Confirmation *!/*/}
            {/*                    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>*/}
            {/*                        <AlertDialogOverlay />*/}
            {/*                        <AlertDialogContent bg="white" color="gray.800">*/}
            {/*                            <AlertDialogHeader color="blue.500">Confirm Deletion</AlertDialogHeader>*/}
            {/*                            <AlertDialogBody>Are you sure you want to delete this feedback?</AlertDialogBody>*/}
            {/*                            <AlertDialogFooter>*/}
            {/*                                <Button ref={cancelRef} onClick={onClose} colorScheme="gray">*/}
            {/*                                    Cancel*/}
            {/*                                </Button>*/}
            {/*                                <Button*/}
            {/*                                    colorScheme="red"*/}
            {/*                                    ml={3}*/}
            {/*                                    onClick={() => handleDeleteFeedback(speck.feedbackId)}*/}
            {/*                                    _hover={{ bg: "blue.500" }}*/}
            {/*                                >*/}
            {/*                                    Delete*/}
            {/*                                </Button>*/}
            {/*                            </AlertDialogFooter>*/}
            {/*                        </AlertDialogContent>*/}
            {/*                    </AlertDialog>*/}
            {/*                </Center>*/}
            {/*            </WrapItem>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <WrapItem flexBasis="100%">*/}
            {/*            <Center p={10}>*/}
            {/*                <Box*/}
            {/*                    maxW="600px"*/}
            {/*                    w="full"*/}
            {/*                    p={5}*/}
            {/*                    bg="white"*/}
            {/*                    boxShadow="lg"*/}
            {/*                    rounded="md"*/}
            {/*                    overflow="hidden"*/}
            {/*                    border="1px dashed #E2E8F0"*/}
            {/*                >*/}
            {/*                    <Text mt={4} fontWeight="bold" fontSize="lg" textAlign="center" color="gray.500">*/}
            {/*                        Oops! No feedback today. Why not share a request?*/}
            {/*                    </Text>*/}
            {/*                </Box>*/}
            {/*            </Center>*/}
            {/*        </WrapItem>*/}
            {/*    )}*/}
            {/*</Flex>*/}
        </>
    );
}
