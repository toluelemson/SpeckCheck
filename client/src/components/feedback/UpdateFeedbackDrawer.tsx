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
// import UpdateFeedbackForm from "./UpdateFeedbackForm";
//
// const CloseIcon = () => "x";
//
// const UpdateFeedbackDrawer = ({ fetchCustomers, initialValues, customerId }) => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     return <>
//         <Button
//             bg={'gray.200'}
//             color={'black'}
//             rounded={'full'}
//             _hover={{
//                 transform: 'translateY(-2px)',
//                 boxShadow: 'lg'
//             }}
//             onClick={onOpen}
//         >
//             Update
//         </Button>
//         <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
//             <DrawerOverlay />
//             <DrawerContent>
//                 <DrawerCloseButton />
//                 <DrawerHeader>Update customer</DrawerHeader>
//                 <DrawerBody>
//                     <UpdateFeedbackForm
//                         fetchCustomers={fetchCustomers}
//                         initialValues={initialValues}
//                         customerId={customerId}
//                     />
//                 </DrawerBody>
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
// export default UpdateFeedbackDrawer;