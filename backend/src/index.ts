require('dotenv').config();
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic(); // defaults to process.env["ANTHROPIC_API_KEY"]

async function main(){
    anthropic.messages.stream({
        messages: [{role: 'user', content: "Write a code for todo application using react"}],
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1024,
    }).on('text', (text) => {
        console.log(text);
    });
}
main();
