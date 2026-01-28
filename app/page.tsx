import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Learnosity Activity Renderer
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Next.js + React + TypeScript
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Available Endpoints
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Assessment Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  📝 Assessment
                </h3>
                <p className="text-gray-700 mb-4">
                  Render assessments with predefined items using Learnosity
                  Items API
                </p>
                <Link
                  href="/assess"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Assessment
                </Link>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-mono bg-white px-2 py-1 rounded">
                    GET /assess
                  </p>
                </div>
              </div>

              {/* Activity Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  🎯 Activity Renderer
                </h3>
                <p className="text-gray-700 mb-4">
                  Render activities by ID using Learnosity Author API
                </p>
                <Link
                  href="/activity?id=quickstart_examples_activity_template_001"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Activity
                </Link>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-mono bg-white px-2 py-1 rounded">
                    GET /activity?id=ACTIVITY_ID
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🚀 Tech Stack
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <strong>Next.js 16</strong> with App Router
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <strong>React</strong> with Server Components
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <strong>TypeScript</strong> for type safety
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <strong>Tailwind CSS</strong> for styling
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <strong>Learnosity SDK</strong> for assessment rendering
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Make sure to configure your Learnosity
                credentials in{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">
                  .env.local
                </code>{" "}
                file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
