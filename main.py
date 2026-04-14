import json
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

JSON_FILE = "images.json"
TOKEN = "7569134209:AAFduDbZGP7I0rQrpssfU7nHlkTlvxd0-us"

def load_data():
    with open(JSON_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=2)

async def banner(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Используй: /banner <URL>")
        return
    data = load_data()
    data["banner"] = context.args[0]
    save_data(data)
    await update.message.reply_text("✅ Баннер обновлён")

async def avatar(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Используй: /avatar <URL>")
        return
    data = load_data()
    data["avatar"] = context.args[0]
    save_data(data)
    await update.message.reply_text("✅ Аватар обновлён")

if __name__ == "__main__":
    app = ApplicationBuilder().token(TOKEN).build()

    app.add_handler(CommandHandler("banner", banner))
    app.add_handler(CommandHandler("avatar", avatar))

    print("Бот запущен...")
    app.run_polling()