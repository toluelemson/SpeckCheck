import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactDOMServer from "react-dom/server";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Loader, Textarea } from "@heathmont/moon-core-tw";
import { useVisibilityControl } from "@/src/hooks/useVisibilityControl";
import Modal from "@/src/client/shared/modal/Modal";
import {
  ArrowsUpdate,
  GenericLink,
  MailEnvelope,
  SecurityLock,
  SecurityVerified,
} from "@heathmont/moon-icons-tw";
import { truncateText } from "@/src/client/shared/utils/TruncateText";
import PagesHeader from "@/src/client/shared/header/PagesHeader";
import SuccessfullyCreated from "./chooseTemplate/components/SuccessfullyCreated";
import { PROJECTS_DATA } from "../dashboard/mainSection/constant/data";
import useCard from "@/src/context/cardContext/useCard";
import { useMutation } from "@tanstack/react-query";
import { sendMail } from "@/src/helper/apis/mail/sendMail";
import apiMessageHelper from "@/src/helper/apiMessageHelper";
import HandleCopyText from "@/src/utils/HandleCopyText";
import ChooseTemplate from "./chooseTemplate/ChooseTemplate";
import Link from "next/link";
import ConditionalRenderer from "@/src/utils/ConditionalRenderer";
import { getFormattedDateTime } from "@/src/utils/GetFormattedDateTime";

const SelectedFeedbackCard = () => {
  const router = useRouter();
  const { query } = router;
  const { handleSharedCard } = useCard();
  const [email, setEmail] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { isOpen, setIsOpen, handleClick } = useVisibilityControl();
  const { isOpen: isSend, setIsOpen: setIsSend } = useVisibilityControl();
  const selectedCard =
    Array.isArray(PROJECTS_DATA) &&
    PROJECTS_DATA.filter((card) => card.id === query.id)[0];

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    text: Yup.string().required("Text is required"),
  });
  const { mutateAsync, isPending } = useMutation({ mutationFn: sendMail });
  const { isCopy, setIsCopy, handleCopyCode } = HandleCopyText(
    `http://localhost:3000/sc/${selectedCard ? selectedCard.id : ""}`
  );

  const [sharedMessage, setSharedMessage] = useState(
    `"Hi, I'm on a mission to upgrade my "personal software". 🖥️ Could you share one thing you admire about me and one area for an update? Your insights are like gold! Thanks, " - From, Abu.`
  );

  const shareUrl = `http://localhost:3000/sc/${
    selectedCard && selectedCard.id
  }`;
  const shareMessage = `"${sharedMessage}" click here: ${shareUrl}`;

  const formattedDateTime = getFormattedDateTime();

  useEffect(() => {
    if (isCopy) {
      const timer = setTimeout(() => {
        setIsCopy(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopy, setIsCopy]);

  return (
    <>
      <ConditionalRenderer content={<PagesHeader />} />
      <div className="flex flex-col items-center justify-center bg-gray-200 py-16 space-y-6">
        <ConditionalRenderer
          sPContent={
            <div className="flex flex-col items-center justify-center space-y-5 px-12 pt-12 w-7/12">
              <Link href="#">
                <p className="text-2xl font-bold text-green-500">SpeckCheck</p>
              </Link>
              <p className="text-center">
                {`"Hi, I'm on a mission to upgrade my "personal software". 🖥️ Could you share one thing you admire about me and one area for an update? Your insights are like gold! Thanks, " - From, Abu.`}
              </p>
            </div>
          }
        />
        <div className="space-y-4 bg-white w-7/12">
          {selectedCard && selectedCard.card(handleClick)}

          <Modal
            openModal={isOpen}
            setOpenModal={setIsOpen}
            modalContent={
              <div className="h-max w-[600px] space-y-2 pb-6">
                <div className="flex items-center justify-between pt-3">
                  <p className="font-bold text-black text-xl pl-3">
                    Share Card
                  </p>
                </div>
                <hr />
                <div className="px-6">
                  <div className="flex flex-col items-start justify-start pb-6 space-y-2 pt-5">
                    <div className="flex items-center">
                      <p className="font-bold">Link To Share</p>
                      <Button
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className="flex items-center border border-green-400 ml-3 rounded-full bg-green-100 font-bold text-[12px]"
                      >
                        <SecurityLock color="black" height={25} width={25} />
                        <p>Send Anonymously</p>
                      </Button>
                      {isAnonymous && (
                        <SecurityVerified
                          color="green"
                          width={25}
                          height={25}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-start w-full space-x-3 pt-2">
                      <div className="flex items-center justify-between h-11 bg-gray-200 w-max rounded-lg">
                        <GenericLink height={30} width={30} className="ml-2" />
                        <div className="text-start px-2">
                          {truncateText(
                            `http:localhost:3000/sc/${query.id}`,
                            42
                          )}
                        </div>
                        <div className=" border-l border-gray-300 p-1">
                          <ArrowsUpdate height={30} width={30} />
                        </div>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="bg-green-600 text-white px-3 w-36 py-2 font-bold rounded-lg"
                      >
                        {!isCopy ? "COPY LINK" : "COPIED!"}
                      </button>
                    </div>
                  </div>

                  <hr />

                  <Formik
                    initialValues={{ email: "", text: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      const data = {
                        from: "abu@godwin.com",
                        to: values.email,
                        subject: selectedCard ? selectedCard.title : "",
                        text: `${shareMessage}`,
                      };

                      // form submission
                      mutateAsync(data).then((res: any) => {
                        apiMessageHelper({
                          message: res?.message,
                          statusCode: res?.statusCode,
                          onSuccessCallback: () => {
                            setSubmitting(true);
                            handleSharedCard({
                              ...selectedCard,
                              createdTime: formattedDateTime,
                            });
                            window.location.href = "/dashboard";
                          },
                          onFailureCallback() {
                            setSubmitting(false);
                          },
                        });
                      });
                      console.log(values);
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form className="flex flex-col pt-3 space-y-3">
                        <p className="font-bold text-black">Invite by email</p>
                        <div className="flex items-center space-x-2 border pl-1">
                          <MailEnvelope color="green" height={35} width={35} />
                          <p>To:</p>
                          <input
                            type="text"
                            name="email"
                            onClick={() => setEmail(true)}
                            placeholder="Enter email address to send review by permission"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="flex items-center w-full h-10 p-2 borderless-input"
                          />
                        </div>

                        {email && (
                          <>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500"
                            />{" "}
                            <Textarea
                              name="text"
                              placeholder="Enter your feedback"
                              value={values.text}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="h-44 w-full border"
                            />
                            <ErrorMessage
                              name="text"
                              component="div"
                              className="text-red-500"
                            />{" "}
                            <div className="flex items-center justify-between">
                              <Button
                                onClick={() => setIsOpen(false)}
                                className="text-black bg-gray-300 px-5 py-1 shadow-2xl"
                              >
                                CANCEL
                              </Button>
                              <Button
                                type="submit"
                                className="bg-green-600 text-white w-32  shadow-2xl"
                              >
                                {isPending ? (
                                  <Loader size="xs" />
                                ) : (
                                  "SEND EMAIL"
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            }
          />
        </div>

        <ConditionalRenderer
          sPContent={
            <p className="text-gray-600">
              Become part of{" "}
              <Link href="/dashboard">
                <span className="text-green-600 font-bold">SpeckCheck</span>
              </Link>{" "}
              and start sending anonymous messages.😎🎉🎉
            </p>
          }
        />
      </div>

      {isSend && (
        <Modal
          openModal={isSend}
          setOpenModal={setIsSend}
          modalContent={<SuccessfullyCreated />}
        />
      )}
    </>
  );
};

export default SelectedFeedbackCard;
