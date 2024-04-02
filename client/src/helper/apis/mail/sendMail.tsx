export interface SendMailLinkPayload {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const sendMail = async (payload: SendMailLinkPayload) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/sendEmail`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    data.statusCode = response.status;
    return data;
  } catch (error) {
    console.error("An error occurred during the API request:", error);
    return { statusCode: 500, error: "Internal Server Error" };
  }
};
