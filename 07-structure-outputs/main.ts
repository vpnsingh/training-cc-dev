// Author: Vipin Singh
// Date: 2026-10-24
// File Description: Requests structured JSON output from a Claude Agent SDK query using a JSON schema.
import { query } from '@anthropic-ai/claude-agent-sdk';

// Define the shape of data you want back
const schema = {
  type: "object",
  properties: {
    company_name: { type: "string" },
    founded_year: { type: "number" },
    headquarters: { type: "string" }
  },
  required: ["company_name"]
};

const response  = query({
    prompt: "Research Anthropic and provide key company information",
    options: {
      outputFormat: {
        type: "json_schema",
        schema: schema
      }
    }
});

async function main() {
    for await (const message of response) {
        if (message.type === 'result' && message.subtype === 'success' && message.structured_output) {
            console.log(`Response: ${JSON.stringify(message.structured_output, null, 2)}`);
        }
    }
}

main();