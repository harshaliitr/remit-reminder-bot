require('dotenv').config();

exports.handler = async (event) => {
  const APP_ID = process.env.APP_ID;
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const TARGET_RATE = 90.0;

  try {
    const currencyUrl = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&symbols=INR&prettyprint=false&show_alternative=false`;

    const response = await fetch(currencyUrl);
    if (!response.ok) {
      throw new Error(`Currency API failed with status ${response.status}: ${response.statusText}`);
    }

    const currencyData = await response.json();

    if (!currencyData.rates || !currencyData.rates.INR) {
      throw new Error("Invalid API response: INR rate not found");
    }

    const rate = currencyData.rates.INR;

    if (rate >= TARGET_RATE) {
      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

      const tgResponse = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `*Threshold Hit!* \n\nUSD to INR is *₹${rate}*. \nInitiate transfer now!`,
          parse_mode: 'Markdown'
        })
      });

      if (!tgResponse.ok) {
        const errorText = await tgResponse.text();
        throw new Error(`Telegram API failed with status ${tgResponse.status}: ${errorText}`);
      }

      return { statusCode: 200, body: "Alert sent!" };
    }

    return { statusCode: 200, body: `Rate is ₹${rate}. No action taken.` };

  } catch (error) {
    console.error("Execution Error:", error.message);
    return { statusCode: 500, body: error.message };
  }
};