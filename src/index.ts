import { StdioServer } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  ListToolsRequest,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { PoseAnalyzer } from "./poseAnalyzer.js";
import { TOOLS } from "./tools.js";

const server = new StdioServer({
  name: "ai-pose-analysis",
  version: "1.0.0",
});

const poseAnalyzer = new PoseAnalyzer();

// Handler for listing available tools
server.setRequestHandler(ListToolsRequest, async () => {
  return {
    tools: TOOLS,
  };
});

// Handler for calling tools
server.setRequestHandler(CallToolRequest, async (request) => {
  const { name, arguments: args } = request;

  try {
    switch (name) {
      case "analyze_pose":
        return await poseAnalyzer.analyzePose(args.imageUrl || args.imageBase64);

      case "detect_gestures":
        return await poseAnalyzer.detectGestures(args.poses);

      case "track_movement":
        return await poseAnalyzer.trackMovement(args.poseSequence);

      case "extract_skeleton":
        return await poseAnalyzer.extractSkeleton(args.poses);

      default:
        return {
          content: [
            {
              type: "text",
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = server.getStdioTransport();
  await server.connect(transport);
  console.error("AI Pose Analysis MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
