import { query } from '@anthropic-ai/claude-agent-sdk';

const response  = query({
    prompt: 'Analyze the project and give me the summary of it.',
    options: {
        allowedTools: ['Read', 'Write', 'Bash']
    }
});

async function main() {
    for await (const result of response) {
        if (result.type === 'assistant') {
            console.log(`Turn completed. Assistant message: ${result.message.content}`);
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