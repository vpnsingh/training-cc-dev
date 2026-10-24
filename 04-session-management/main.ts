import { query } from '@anthropic-ai/claude-agent-sdk';

async function main() {
    for await (const result of query({
        prompt: 'My favourite color is black. What is your favourite color?'
    })) {
        if (result.type === 'result' && result.subtype === 'success') {
            console.log(`Result: ${result.session_id}`);
            console.log(`Result: ${result.result}`);
        }
    }

    for await (const result of query({
        prompt: 'What is my favourite color?',
        options: {
            // continue:  true  // Continue the conversation from the previous query (most recent context is preserved)
            resume: '1aa6887f-b256-4495-a14c-8a19e1a42691' // Resume the conversation from a specific session ID
        }
    })) {
        if (result.type === 'result' && result.subtype === 'success') {
            console.log(`Result: ${result.result}`);
        }
    }
}

main();