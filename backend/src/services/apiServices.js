const { Together } = require('together-ai');
const { TOGETHER_API_KEY } = require('../config/dotenvConfig');

const together = new Together(TOGETHER_API_KEY);

async function queryTogetherAPI(prompt) {
    try {
        if (!TOGETHER_API_KEY) throw new Error('Together API key is missing');

        const response = await together.chat.completions.create({
            messages: [{ "role": "user", "content": prompt }],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            temperature: 0.7,
            top_p: 0.7,
            max_tokens: 100,
            stop: ["<|eot_id|>", "<|eom_id|>"]
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Together API error:', error.message);
        throw error;
    }
}

module.exports = { queryTogetherAPI };
