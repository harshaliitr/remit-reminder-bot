# Remit Reminder Bot

## Open Exchange Rates Setup (Get APP_ID)
1. **Create Account**: Go to [Open Exchange Rates](https://openexchangerates.org/signup/free) and sign up for a **Free** plan.
2. **Get App ID**: Once logged in, go to your dashboard/App IDs section to find your **App ID**. This will be used as your `APP_ID` environment variable.

## Telegram Setup
To get this working, you need a Bot Token and your Chat ID.

1. **Get the Token**: Search for **@BotFather** on Telegram. Message him `/newbot`, follow the steps, and he will give you an API Token.

2. **Get your Chat ID**:
   - Search for **@userinfobot** on Telegram and message it.
   - It will reply with your Id (a string of numbers like 123456789).

3. **Start the Bot**: Open a chat with your new bot and press "Start".

## AWS Lambda Setup
1. **Create the Function**: Go to the AWS Console > Lambda > Create function. Choose "Node.js 20.x".
2. **Upload Code**: Zip your `index.js`, `package.json`, and `node_modules` together and upload the `.zip` file.
   - *Important*: Ensure `index.js` is at the root of the zip file, not inside a folder.
3. **Environment Variables**: Under the Configuration tab > Environment variables, add your keys:
   - `APP_ID`
   - `TELEGRAM_TOKEN`
   - `CHAT_ID`

## The Trigger (The "Cron")
1. Click **Add trigger** at the top.
2. Select **EventBridge (CloudWatch Events)**.
3. Select **Create a new rule**.
4. **Rule type**: Schedule expression.
5. **Expression**: `rate(1 hour)`.
