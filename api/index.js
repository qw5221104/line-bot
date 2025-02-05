const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN; // 環境變數

// 測試 API 是否正常運行
app.get('/', (req, res) => {
    res.send("🚀 LINE Bot 伺服器已運行");
});

// Webhook 路由
app.post('/api/webhook', async (req, res) => {
    console.log("📩 收到 LINE Webhook:", req.body);

    if (!req.body.events) {
        return res.status(400).send("Bad Request");
    }

    const events = req.body.events;

    for (let event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            if (event.message.text === '我是生日壽星') {
                const replyToken = event.replyToken;
                await sendQuickReply(replyToken);
            }
        }
    }

    res.status(200).send({ status: 'ok' }); // 確保回應 200 OK
});

// 發送回覆訊息
async function sendQuickReply(replyToken) {
    const message = {
        replyToken: replyToken,
        messages: [
            {
                type: 'text',
                text: "🎉 生日快樂！請選擇以下選項",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: "🎂 領取生日優惠",
                                text: "領取生日優惠"
                            }
                        }
                    ]
                }
            }
        ]
    };

    try {
        const response = await axios.post('https://api.line.me/v2/bot/message/reply', message, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
            }
        });
        console.log("✅ 回覆成功:", response.data);
    } catch (error) {
        console.error("❌ 回覆失敗:", error.response ? error.response.data : error.message);
    }
}

// 讓 Vercel 識別 API
module.exports = app;

