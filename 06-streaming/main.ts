// Author: Vipin Singh
// Date: 2026-10-24
// File Description: Streams partial text output from a Claude Agent SDK query to stdout.
import { query } from '@anthropic-ai/claude-agent-sdk';

const response  = query({
    prompt: 'Give me information about claude certified developer certification',
    options: {
        includePartialMessages: true // This option enables streaming of partial messages from the Claude Agent SDK, allowing for real-time output as the response is generated.
    }
});

async function main() {
    for await (const result of response) {
        if (result.type === 'stream_event') {
            const event = result.event;
            if (event.type === 'content_block_delta') {
                if (event.delta.type === "text_delta") {
                    process.stdout.write(event.delta.text);
                }
            }
        }
    }
}

main();