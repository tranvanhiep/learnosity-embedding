import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
// @ts-ignore - learnosity-sdk-nodejs doesn't have TypeScript definitions
import Learnosity from "learnosity-sdk-nodejs";
import config from "@/lib/config";
import type { ItemsAPIRequest, ItemsAPIResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customUser = searchParams.get("user");

    const userId = customUser || `demo-user-${uuidv4()}`;
    const sessionId = `demo-session-${uuidv4()}`;

    const itemsRequest: ItemsAPIRequest = {
      user_id: userId,
      session_id: sessionId,
      activity_id: "assessment-demo",
      name: "Assessment Demo",
      rendering_type: "assess",
      type: "submit_practice",
      config: {
        time: {
          max_time: 1500, // 25 minutes
          limit_type: "soft",
          show_pause: true,
          show_time: true,
        },
      },
      items: ["Demo3", "Demo6", "Demo7", "Demo8", "Demo9", "Demo10"],
    };

    const learnositySDK = new Learnosity();
    const initOptions = learnositySDK.init(
      "items",
      {
        consumer_key: config.consumerKey,
        domain: config.domain,
      },
      config.consumerSecret,
      itemsRequest,
    );

    const response: ItemsAPIResponse = {
      security: JSON.stringify(initOptions.security),
      request: JSON.stringify(initOptions.request),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error initializing Items API:", error);
    return NextResponse.json(
      { error: "Failed to initialize Items API" },
      { status: 500 },
    );
  }
}
