import { query } from '@anthropic-ai/claude-agent-sdk';

const response = await query({
    prompt: 'Write a TypeScript function that takes a string and returns the string reversed.',
    options : {
        allowedTools: ['Read', 'Write', 'Bash', 'Edit'],
        settingSources: ['user', 'project']
    }
});

async function main() {
    for await (const result of response) {
        if (result.type === 'assistant') {
            console.log(`Turn completed. Assistant message: ${result.message}`);
        }

        if (result.type === 'result') {
            if(result.subtype === 'success') {
                console.log(`Turn completed. Result: ${result.result}`);
            } else {
                console.log(`Stopped: ${result.subtype}`);
            }
        }
    }
}

main();