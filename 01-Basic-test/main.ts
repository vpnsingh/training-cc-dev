import {query } from '@anthropic-ai/claude-agent-sdk';

const response = await query({
    prompt: 'Write a TypeScript function that takes a string and returns the string reversed.',
})

async function main() {
    for await (const chunk of response) {
        if (chunk.type === 'result' && chunk.subtype === 'success') {
            console.log(chunk.result);
        }
    }
}

main();
