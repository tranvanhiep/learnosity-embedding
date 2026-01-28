"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import type { ItemsAPIResponse } from "@/lib/types";

declare global {
  interface Window {
    LearnosityItems: {
      init: (
        request: unknown,
        security: unknown,
        callbacks?: Record<string, unknown>,
      ) => void;
    };
  }
}

export default function AssessPage() {
  const [initData, setInitData] = useState<ItemsAPIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    async function fetchInitData() {
      try {
        const response = await fetch("/api/assess");
        if (!response.ok) {
          throw new Error("Failed to initialize assessment");
        }
        const data: ItemsAPIResponse = await response.json();
        setInitData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchInitData();
  }, []);

  useEffect(() => {
    if (scriptLoaded && initData && window.LearnosityItems) {
      try {
        const request = JSON.parse(initData.request);
        const security = JSON.parse(initData.security);

        const callbacks = {
          readyListener() {
            console.log("Learnosity Items API is ready");
          },
          errorListener(err: Error) {
            console.error("Learnosity error:", err);
          },
        };

        window.LearnosityItems.init(request, security, callbacks);
      } catch (err) {
        setError("Failed to initialize Learnosity Items");
        console.error(err);
      }
    }
  }, [scriptLoaded, initData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {initData && (
        <Script
          src={
            process.env.NEXT_PUBLIC_ITEMS_API_URL ||
            "https://items.learnosity.com/?latest-lts"
          }
          onLoad={() => setScriptLoaded(true)}
          onError={() => setError("Failed to load Learnosity script")}
        />
      )}

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Assessment Demo
              </h1>
              <p className="text-gray-600">
                This assessment uses the Learnosity Items API with predefined
                items.
              </p>
            </div>

            <div id="learnosity_assess" className="learnosity-container"></div>
          </div>
        </div>
      </div>
    </>
  );
}
