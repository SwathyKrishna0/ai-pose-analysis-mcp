import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const TOOLS: Tool[] = [
  {
    name: "analyze_pose",
    description:
      "Analyze a single frame or image to detect human poses and extract pose keypoints",
    inputSchema: {
      type: "object",
      properties: {
        imageUrl: {
          type: "string",
          description: "URL of the image to analyze",
        },
        imageBase64: {
          type: "string",
          description:
            "Base64 encoded image data (alternative to imageUrl)",
        },
        confidenceThreshold: {
          type: "number",
          description:
            "Minimum confidence score for pose detection (0-1, default: 0.5)",
          default: 0.5,
        },
      },
      required: ["imageUrl"],
    },
  },
  {
    name: "detect_gestures",
    description:
      "Detect specific gestures from pose keypoints (e.g., thumbs up, hand raise, sitting)",
    inputSchema: {
      type: "object",
      properties: {
        poses: {
          type: "array",
          description: "Array of pose data with keypoints",
          items: {
            type: "object",
          },
        },
        gestureTypes: {
          type: "array",
          description:
            "Specific gestures to detect (optional, detects all if not specified)",
          items: {
            type: "string",
            enum: ["thumbs_up", "hand_raise", "sitting", "standing", "walking"],
          },
        },
      },
      required: ["poses"],
    },
  },
  {
    name: "track_movement",
    description:
      "Track movement patterns over a sequence of poses (e.g., velocity, acceleration, trajectory)",
    inputSchema: {
      type: "object",
      properties: {
        poseSequence: {
          type: "array",
          description: "Sequence of pose frames",
          items: {
            type: "object",
          },
        },
        joint: {
          type: "string",
          description:
            "Specific joint to track (e.g., 'right_hand', 'left_foot')",
        },
        smoothing: {
          type: "boolean",
          description: "Apply smoothing filter to trajectory",
          default: true,
        },
      },
      required: ["poseSequence"],
    },
  },
  {
    name: "extract_skeleton",
    description:
      "Extract and normalize skeletal structure from pose data for comparison or matching",
    inputSchema: {
      type: "object",
      properties: {
        poses: {
          type: "array",
          description: "Array of pose data",
          items: {
            type: "object",
          },
        },
        format: {
          type: "string",
          description: "Output format for skeleton data",
          enum: ["json", "svg", "openpose"],
          default: "json",
        },
      },
      required: ["poses"],
    },
  },
];
