const SMSURL = process.env.SMS_URL;
const SMSKEY = process.env.SMS_KEY;

export const f_send_by_sms = async (numbers, message) => {

  if (!message || numbers.lenght === 0 ) {
    throw new Error("Some data is missing")
  }

  const response = await fetch(`${SMSURL}/sms/2/text/advanced`, {
    method: "POST",
    headers: {
      Authorization: `App ${SMSKEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          destinations: numbers,
          text: message,
        },
      ],
    }),
  });
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from SMS Service");
  }

  if (!response.ok) {
    throw new Error(
      data?.requestError?.serviceException?.text || "Failed to send SMS",
    );
  }

  return data;
};
