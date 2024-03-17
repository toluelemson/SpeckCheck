import React, {FC, useEffect, useState} from 'react';
import {
    Spinner,
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar";
import FeedbackShow from "./components/feedback/FeedbackShow";
import RequestFeedbackForm from "./components/shared/RequestForm";
import {RequestCard} from "./components/feedback/RequestCard";
import {
    deleteRequest,
    getRequests,
    updateRequestById
} from "./services/client";
import {errorNotification, successNotification} from "./services/notification";
import {decodeJWT, useAuth} from "./components/context/AuthContext";

interface Dashboard {
    [key: string]: any;
}

interface Request {

    [key: string]: any;
}

interface Error {
    code?: string;
    message?: string;
    response?: any;
}

const Dashboard: FC = () => {
    const [request, setRequest] = useState<Request | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<Error | null>(null);
    const [requestUpdated, setRequestUpdated] = useState<boolean | null>(null);
    const [requestMessageUpdated, setRequestMessageUpdate] = useState<boolean>(false);

    const user = useAuth();

    const fetchRequest = async () => {

        try {
            setLoading(true);
            const user = decodeJWT()
            if(user) {
                const res = await getRequests(user.jti);
                setRequest(res);
                console.log(res, res)
                setRequestUpdated(true);
            }
        } catch (error: any) {
            setError(error);
            errorNotification(error.code ?? 'Unknown error', error.message ?? 'Something went wrong.');

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const initData = async (request: Request | null) => {
            await fetchRequest();
            //await fetchFeedbacks(request)
        };

        initData(request);

    }, [requestUpdated]);

    const onUpdateRequest = async (id: string, message: string) => {
        try {
            // @ts-ignore
            await updateRequestById(id, message);
            setRequestMessageUpdate(!requestMessageUpdated);
        } catch (error:any) {
            setError(error);
            errorNotification(error.code ?? 'Unknown error', error.message ?? 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }
    const onDeleteRequest = async (requestId: string) => {
        try {
            await deleteRequest(requestId);

            successNotification("Info", "Request deleted")
            // setRequestUpdated(!requestUpdated)

        } catch (error: any) {
            setError(error as Error);
            errorNotification(error.code ?? 'Unknown error', error.message ?? 'Something went wrong.');
        }
    }

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        );
    }
    //
    // if (err) {
    //     return (
    //         <SidebarWithHeader>
    //             <CreateFeedbackDrawer fetchFeedbacks={fetchFeedbacks} />
    //             <Text mt={5}>{err.message}</Text>
    //         </SidebarWithHeader>
    //     );
    // }

    return (
        <SidebarWithHeader>
            {request && requestUpdated ? (
                <RequestCard
                    {...request[0]}
                    onDeleteRequest={onDeleteRequest}
                    editRequest={onUpdateRequest}
                    updateRequest={() => setRequestUpdated(!requestUpdated)}
                />
            ) : (
                <RequestFeedbackForm
                    updateRequest={() => setRequestUpdated(!requestUpdated)}
                    {...request}
                />
            )}
                <FeedbackShow
                    // onDeleteFeedback = {onDeleteFeedback}
                    request={request}
                    />

        </SidebarWithHeader>

    );
}
export default Dashboard;
