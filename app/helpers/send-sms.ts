export const sendSMS = async (to: string, message: string) => {
  try {
    const response = await fetch(
      `https://sms.ru/sms/send?api_id=CBE68F88-8181-9DB1-DD98-08B57E7E0368&to=${to}&msg=${message}&json=1`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
