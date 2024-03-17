// import {
//     Button,
//     Drawer,
//     DrawerBody,
//     DrawerCloseButton,
//     DrawerContent,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerOverlay,
//     useDisclosure
// } from "@chakra-ui/react";
// import CreateUserForm from "../shared/CreateUserForm";
// import RequestFeedbackForm from "../shared/RequestFeedbackForm";
// import React from "react";
//
// const AddIcon = () => "+";
// const CloseIcon = () => "x";
//
// const CreateFeedbackDrawer = ({ fetchFeedbacks}) => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     return <>
//         <Button
//             leftIcon={<AddIcon/>}
//             colorScheme={"teal"}
//             onClick={onOpen}
//         >
//            Request feedback
//         </Button>
//         <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
//             <DrawerOverlay />
//             <DrawerContent>
//                 <DrawerCloseButton />
//                 <DrawerHeader>Request Feedback</DrawerHeader>
//
//                 <DrawerBody>
//                     <RequestFeedbackForm
//                         onSuccess={fetchFeedbacks}
//                     />
//                 </DrawerBody>
//
//                 <DrawerFooter>
//                     <Button
//                         leftIcon={<CloseIcon/>}
//                         colorScheme={"teal"}
//                         onClick={onClose}>
//                     Close
//                     </Button>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//         </>
//
// }
//
// export default CreateFeedbackDrawer;