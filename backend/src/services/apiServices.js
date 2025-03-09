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

// // src/services/apiService.js
// const { Together } = require('together-ai');

// // Initialize Together client
// let together;
// try {
//     together = new Together(process.env.TOGETHER_API_KEY);
// } catch (error) {
//     console.error('Failed to initialize Together AI client:', error.message);
// }

// // Query Together AI API
// async function queryTogetherAPI(prompt) {
//     try {
//         if (!process.env.TOGETHER_API_KEY) {
//             throw new Error('Together API key is missing');
//         }

//         const response = await together.chat.completions.create({
//             messages: [
//                 {
//                     "role": "user",
//                     "content": prompt
//                 }
//             ],
//             model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
//             temperature: 0.7,
//             top_p: 0.7,
//             top_k: 50,
//             max_tokens: 100, // Limit to short responses for lyrics snippets
//             repetition_penalty: 1,
//             stop: ["<|eot_id|>", "<|eom_id|>"]
//         });

//         // Extract the generated text
//         return response.choices[0].message.content.trim();
//     } catch (error) {
//         console.error('Together API error:', error.message);
//         throw error;
//     }
// }

// module.exports = {
//     queryTogetherAPI
// };