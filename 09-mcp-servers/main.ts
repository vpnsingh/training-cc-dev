
import { query } from "@anthropic-ai/claude-agent-sdk";

async function main() {
  for await (const message of query({
    prompt: `
      Use Git MCP and Time MCP to analyze this TypeScript project.

      1. Use Git MCP to inspect the current branch, working-tree
         status, recent commits, and unstaged changes.
      2. Ushe cue Time MCP to get trrent date and time in
         Asia/Kolkata.
      3. Summarize the repository state and recent changes.
      4. Recommend the next three development tasks.

      Do not edit files, stage changes, or create commits.
      Base the report on the actual MCP tool results.
    `,
    options: {
      mcpServers: {
        git: {
          type: "stdio",
          command: "uvx",
          args: [
            "mcp-server-git",
            "--repository",
            process.cwd(),
          ],
        },

        time: {
          type: "stdio",
          command: "uvx",
          args: ["mcp-server-time"],
        },
      },

      allowedTools: [
        "mcp__git__git_status",
        "mcp__git__git_diff_unstaged",
        "mcp__git__git_diff_staged",
        "mcp__git__git_log",
        "mcp__git__git_show",
        "mcp__time__get_current_time",
        "mcp__time__convert_time",
      ],

      maxTurns: 10,
    },
  })) {
    if (message.type === "system" && message.subtype === "init") {
      console.log("MCP server status:", message.mcp_servers);
    }

    if (message.type === "result" && message.subtype === "success") {
      console.log("\n--- MCP Analysis Report ---\n");
      console.log(message.result);
    }
  }
}

main().catch(console.error);
