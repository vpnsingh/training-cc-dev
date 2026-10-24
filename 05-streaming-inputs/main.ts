import { query, SDKUserMessage } from '@anthropic-ai/claude-agent-sdk';

async function* generateMessage() : AsyncGenerator<SDKUserMessage> {
    yield {
        type: 'user',
        message: {
            role: 'user',
            content: 'Analyze the code base for proper comments on each function?'
        },
        parent_tool_use_id: null,
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    yield {
        type: 'user',
        message: {
            role: 'user',
            content: 'Generate a new .md file for fixes and suggestions on comments for each function'
        },
        parent_tool_use_id: null,
    }
}

async function main() {
    for await (const result of query({
        prompt: generateMessage(),
        options: {
            maxTurns: 10,
            allowedTools: ['Read', 'Write', 'Grep', 'Edit']
        }
    })) {
        if (result.type === 'result' && result.subtype === 'success') {
            console.log(`Result: ${result.result}`);
        }
    }
}

main();