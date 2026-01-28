"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import type { AuthorAPIResponse } from "@/lib/types";

declare global {
  interface Window {
    LearnosityAuthor: {
      init: (
        request: unknown,
        selector: string,
        callbacks?: Record<string, unknown>,
      ) => void;
    };
  }
}

function ActivityContent() {
  const searchParams = useSearchParams();
  const activityId =
    searchParams.get("id") || "quickstart_examples_activity_template_001";

  const [initData, setInitData] = useState<AuthorAPIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    async function fetchInitData() {
      try {
        const response = await fetch(
          `/api/activity?id=${encodeURIComponent(activityId)}`,
        );
        if (!response.ok) {
          throw new Error("Failed to initialize activity");
        }
        const data: AuthorAPIResponse = await response.json();
        setInitData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchInitData();
  }, [activityId]);

  useEffect(() => {
    if (scriptLoaded && initData && window.LearnosityAuthor) {
      try {
        // Parse the security and request data
        const security = JSON.parse(initData.security);
        const request = JSON.parse(initData.request);

        // Combine security and request for Learnosity Author API init
        const initRequest = {
          security: security,
          request: request,
        };

        console.log("Initializing Learnosity Author API with:", initRequest);

        const callbacks = {
          readyListener() {
            console.log("Learnosity Author API is ready");
          },
          errorListener(err: Error) {
            console.error("Learnosity error:", err);
            setError(`Learnosity initialization failed: ${err.message}`);
          },
        };

        window.LearnosityAuthor.init(
          initRequest,
          "#learnosity-author",
          callbacks,
        );
      } catch (err) {
        setError("Failed to initialize Learnosity Author");
        console.error(err);
      }
    }
  }, [scriptLoaded, initData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading activity...</p>
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
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
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
            process.env.NEXT_PUBLIC_AUTHOR_API_URL ||
            "https://authorapi.learnosity.com/?latest-lts"
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
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Activity Editor
              </h1>
              <p className="text-gray-600 mb-2">
                Viewing activity:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {activityId}
                </code>
              </p>
              <p className="text-sm text-gray-500">
                This activity uses the Learnosity Author API in activity_edit
                mode.
              </p>
            </div>

            <div
              id="learnosity-author"
              className="learnosity-container min-h-[600px]"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ActivityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ActivityContent />
    </Suspense>
  );
}
