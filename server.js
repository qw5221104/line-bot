const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const LINE_ACCESS_TOKEN = '你的_LINE_Channel_Access_Token'; // 請填入你的 LINE Token

// 測試首頁
app.get('/', (req, res) => {
    res.send('LINE Bot 伺服器已運行 🚀');
});

// LINE Webhook 路由
app.post('/webhook', async (req, res) => {
    console.log('收到 Webhook 請求：', req.body);

    // 確保 Webhook 有收到請求
    if (!req.body.events) {
        return res.sendStatus(400);
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

    // 這行很重要，確保 LINE 收到 200 OK
    res.sendStatus(200);
});

// 送出 Quick Reply
async function sendQuickReply(replyToken) {
    const messageData = {
        replyToken: replyToken,
        messages: [{
            type: "text",
            text: "祝你生日快樂！🎉"
        }]
    };

    try {
        await axios.post('https://api.line.me/v2/bot/message/reply', messageData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
            }
        });
    } catch (error) {
        console.error('發送訊息失敗', error.response.data);
    }
}

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Webhook 伺服器運行中，監聽 ${PORT} 端口`);
});
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const LINE_ACCESS_TOKEN = '你的_LINE_Channel_Access_Token'; // 這裡要填上你的 LINE Bot Token

app.post('/webhook', async (req, res) => {
    const events = req.body.events;

    for (let event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            if (event.message.text === '我是生日壽星') {
                const replyToken = event.replyToken;
                await sendQuickReply(replyToken);
            }
        }
    }
    res.sendStatus(200);
});

async function sendQuickReply(replyToken) {
    const message = {
        type: "text",
        text: "請選擇您的生日月份！",
        quickReply: {
            items: [
                { type: "action", action: { type: "message", label: "一月", text: "一月" } },
                { type: "action", action: { type: "message", label: "二月", text: "二月" } },
                { type: "action", action: { type: "message", label: "三月", text: "三月" } },
                { type: "action", action: { type: "message", label: "四月", text: "四月" } },
                { type: "action", action: { type: "message", label: "五月", text: "五月" } },
                { type: "action", action: { type: "message", label: "六月", text: "六月" } }
            ]
        }
    };

    await axios.post('https://api.line.me/v2/bot/message/reply', 
        {
            replyToken: replyToken,
            messages: [message]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
            }
        }
    );
}

app.listen(3000, () => console.log('Webhook 伺服器運行中，監聽 3000 端口'));


const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const LINE_ACCESS_TOKEN = '你的_LINE_Channel_Access_Token';  // 這裡換成你的 LINE Token

// 設置 Webhook 路徑
app.post('/webhook', async (req, res) => {
    console.log("收到 LINE Webhook:", req.body);

    const events = req.body.events;

    for (let event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            if (event.message.text === '我是生日壽星') {
                const replyToken = event.replyToken;
                await sendQuickReply(replyToken);
            }
        }
    }

    res.status(200).send({ status: 'ok' }); // 確保回傳 200 OK
});

// 測試 `/` 路徑，確認伺服器是否正常運作
app.get('/', (req, res) => {
    res.send("LINE Bot 伺服器已運行 🚀");
});

// 回覆快速回覆按鈕
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

    await axios.post('https://api.line.me/v2/bot/message/reply', message, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
        }
    });
}

// 設置伺服器運行的端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook 伺服器運行中，監聽 ${PORT} 端口`);
});

