import React from 'react';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Stack,
    Tag,
    Text,
    useColorModeValue,
    useDisclosure,
    Icon,
    Link,
    Tooltip,
    Modal, // Step 1: Import Modal component
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';
import {
    FiMail,
    FiCalendar,
    FiFacebook,
    FiTwitter,
    FiMessageCircle,
    FiEdit,
    FiTrash2,
    FiClipboard,
    FiExternalLink
} from 'react-icons/fi';
import RequestFeedbackForm from "../shared/RequestForm";


// Define a type or interface for your props
interface RequestCardProps {
    requestId: string;
    requestMessage: string;
    recipientName: string;
    requestDate: string;
    feedbackUrl: string;
    requestURLCode: string;
    onDeleteRequest?: (id: string) => void;
    updateRequest: () => void;
    editRequest?: (message: string, id: string) => void;
}

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    requestData?: any;
};


const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, requestData }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Request</ModalHeader>
                <ModalBody>
                    <RequestFeedbackForm {...requestData} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
const DeleteConfirmationModal:  React.FC<EditModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Deletion</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this request? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onConfirm}>
                        Yes, Delete
                    </Button>
                    <Button onClick={onClose}>
                        No, Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export const RequestCard: React.FC<RequestCardProps> = (props) => {

    const {
        requestId,
        requestURLCode,
        requestMessage,
        recipientName,
        requestDate,
        feedbackUrl,
        onDeleteRequest,
        updateRequest,
    } =  props;


    const completeUrl = `${feedbackUrl}s/${requestURLCode}`
    const shareText = `${requestMessage} ${recipientName}. Kindly use this link: ${completeUrl} `;
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

    const confirmDeleteRequest = () => {
        if (onDeleteRequest) {
            onDeleteRequest(requestId);
        }
        if (updateRequest) {
            updateRequest();
        }
        onConfirmClose();
    };

    const handleShare = (url: string, text: string) => {
        let shareURL = '';
        switch (url) {
            case 'WhatsApp':
                shareURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
                break;
            case 'Twitter':
                shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                break;
            case 'Facebook':
                shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                break;
            case 'Clipboard':
                const textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                break;
            case 'CopyAndOpen':
                const copyArea = document.createElement("textarea");
                copyArea.value = text;
                document.body.appendChild(copyArea);
                copyArea.select();
                document.execCommand('copy');
                document.body.removeChild(copyArea);
                shareURL = text;
                return;
            default:
                break;
        }
        window.open(shareURL, '_blank');
    };


    // Step 2: Initialize useDisclosure hook
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleEditRequest = () => {
        onOpen();
    };

    return (
        <Center py={6}>
            <Flex
                w={'full'}
                m={2}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded={'lg'}
                overflow={'hidden'}
                direction="row"
                transition="0.3s all"
                _hover={{ transform: 'scale(1.02)' }}
            >
                <Box p={6}>
                    <Stack spacing={4} w="100%">
                        <Flex align="center" direction="row" wrap="nowrap">
                            <Tag borderRadius={'full'} variant="outline" colorScheme="blue" mr={2}>
                                {completeUrl}
                            </Tag>
                            {/*<Tooltip label="Copy link">*/}
                            {/*    <Link onClick={() => handleShare('Clipboard', completeUrl)}>*/}
                            {/*        <Icon as={FiClipboard} boxSize={4} _hover={{ color: 'blue.500' }} />*/}
                            {/*    </Link>*/}
                            {/*</Tooltip>*/}
                            <Tooltip label="Open in new tab">
                                <Link onClick={() => handleShare('CopyAndOpen', completeUrl)}>
                                    <Icon as={FiExternalLink} boxSize={4} _hover={{ color: 'blue.500' }} />
                                </Link>
                            </Tooltip>
                        </Flex>


                        <Flex align="center" justify="space-between">
                            <Heading fontSize={'x'} fontWeight={500} fontFamily={'body'}>
                                Request Card
                            </Heading>
                            <Flex>
                                <Tooltip label="Update Request">
                                    <Link onClick={handleEditRequest} ml={2}>
                                        <Icon as={FiEdit} boxSize={4} _hover={{ color: 'blue.500' }} />
                                    </Link>
                                </Tooltip>
                                <Tooltip label="Delete Request">
                                    <Link onClick={onConfirmOpen} ml={2}>
                                        <Icon as={FiTrash2} boxSize={4} color="red.500" _hover={{ color: 'red.700' }} />
                                    </Link>
                                </Tooltip>

                            </Flex>
                        </Flex>

                        <Text color={'gray.600'}>
                            <Flex align="center">
                                <Icon as={FiMail} boxSize={4} mr={1} />
                                "{requestMessage}" - From, {recipientName}.
                            </Flex>
                        </Text>

                        <Text color={'gray.600'}>
                            <Flex align="center">
                                <Icon as={FiCalendar} boxSize={4} mr={1} />
                                {requestDate}
                            </Flex>
                        </Text>

                        <Text color={'gray.600'} fontWeight="bold">Share this request:</Text>
                        <Flex align="center">
                            <Tooltip label="Share via WhatsApp">
                                <Link onClick={() => handleShare('WhatsApp', shareText)}>
                                    <Icon as={FiMessageCircle} boxSize={6} mr={2} _hover={{ color: 'green.500' }} />
                                </Link>
                            </Tooltip>
                            <Tooltip label="Share via Twitter">
                                <Link onClick={() => handleShare('Twitter', shareText)}>
                                    <Icon as={FiTwitter} boxSize={6} mr={2} _hover={{ color: 'blue.400' }} />
                                </Link>
                            </Tooltip>
                            <Tooltip label="Share via Facebook">
                                <Link onClick={() => handleShare('Facebook', shareText)}>
                                    <Icon as={FiFacebook} boxSize={6} mr={2} _hover={{ color: 'blue.600' }} />
                                </Link>
                            </Tooltip>
                            <Tooltip label="Copy to Clipboard">
                                <Link onClick={() => handleShare('Clipboard', shareText)}>
                                    <Icon as={FiClipboard} boxSize={6} mr={2} _hover={{ color: 'blue.500' }} />
                                </Link>
                            </Tooltip>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>

            <EditModal isOpen={isOpen} onClose={onClose} requestData={{ updateRequest, requestId, requestMessage }} />
            <DeleteConfirmationModal isOpen={isConfirmOpen} onClose={onConfirmClose} onConfirm={confirmDeleteRequest} />

        </Center>
    );
}
