import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

// Define a custom tool that fetches the current temperature for a given city
const getWeatherInfoByCityName = tool(
    'get_weather_info',
    'Fetched the current weather information for a given city name',
    {
        cityName: z.string().describe('The name of the city to fetch weather information for'),
    },
    async ({ cityName }) => {
        const url = `https://wttr.in/${cityName.toLowerCase()}?format=%C+%t`;
        const response = await fetch(url);
        const data = await response.text();
        return {
            content: [{ type: 'text', text: data }],
        }
    }
)

// Wrap the tool in an in-process MCP server
const weatherServer = createSdkMcpServer({
  name: "weather",
  version: "1.0.0",
  tools: [getWeatherInfoByCityName]
});

async function main() {

    const schema = {
        type: "object",
        properties: {
            tempInCelsius: { type: "string" },
            tempInFahrenheit: { type: "string" },
            condition: { type: "string" },
            suggestions: { type: "string" }
        }
    }

    for await (const message of query({
        prompt: "What's the temperature in Mumbai, India ?",
        options: {
            mcpServers: { weather: weatherServer },
            allowedTools: ["mcp__weather__get_weather_info"],
            outputFormat: {
                type: "json_schema",
                schema: schema
            }
        }
    })) {
        if (message.type === "result" && message.subtype === "success") {
            console.log(message.structured_output);
        }
    }
}

main();
