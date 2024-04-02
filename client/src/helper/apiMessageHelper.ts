import { ErrorToast, SuccessToast } from "../client/shared/toastBar";

interface IApiMsgHelperType {
  statusCode: number;
  onSuccessCallback?: () => void;
  onFailureCallback?: () => void;
  message?: string | [];
}

const apiMessageHelper = ({
  statusCode,
  onSuccessCallback,
  onFailureCallback,
  message,
}: IApiMsgHelperType) => {
  if (statusCode >= 400 && statusCode <= 500) {
    if (Array.isArray(message)) {
      message.forEach((value) => ErrorToast({ text: value }));
    } else {
      ErrorToast({ text: message });
    }
    onFailureCallback && onFailureCallback();
  }

  if (statusCode === 200 || statusCode === 201) {
    onSuccessCallback && onSuccessCallback();
    if (typeof message === "string") {
      SuccessToast({ text: message });
    }
  }
};

export default apiMessageHelper;
