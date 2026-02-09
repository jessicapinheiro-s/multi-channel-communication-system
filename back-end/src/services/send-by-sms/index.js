const SMSURL = process.env.SMS_URL;
const SMSKEY = process.env.SMS_KEY;

export const f_send_by_sms = async (numbers, message) => {
    if(!Array.isArray(numbers)){
        return 
    }
    try {
        const response = await fetch(`${SMSURL}/sms/2/text/advanced`, {
            method: 'POST',
            headers: {
                'Authorization': `App ${SMSKEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        destinations: numbers.map(n => {to: n}),
                        text: message
                    }
                ],

            })
        })
        const data = await response.json()
        return data;
    }catch(error) {
        throw error;
    }
}   