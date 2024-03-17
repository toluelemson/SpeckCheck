import { createStandaloneToast } from '@chakra-ui/toast';

const { toast } = createStandaloneToast();

interface NotificationOptions {
    title: string;
    description: string;
    status: "success" | "error" | "warning" | "info";
}

const notification = ({ title, description, status }: NotificationOptions) => {
    toast({
        title,
        description,
        status,
        isClosable: true,
        duration: 4000
    });
}

export const successNotification = (title: string, description: string) => {
    notification({
        title,
        description,
        status: "success"
    });
}

export const errorNotification = (title: string, description: string) => {
    notification({
        title,
        description,
        status: "error"
    });
}