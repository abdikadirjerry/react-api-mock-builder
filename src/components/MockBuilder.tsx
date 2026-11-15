import React, { useState } from "react";
import type { MockEndpoint, HttpMethod, TestResult } from "../types/api";

interface MockBuilderProps {
  endpoints: MockEndpoint[];
  onAddEndpoint: (ep: Omit<MockEndpoint, "id">) => void;
  onDeleteEndpoint: (id: string) => void;
}

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  PUT: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  DELETE: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export const MockBuilder: React.FC<MockBuilderProps> = ({
  endpoints,
  onAddEndpoint,
  onDeleteEndpoint,
}) => {
  const [selectedEpId, setSelectedEpId] = useState<string>(
    endpoints[0]?.id || "",
  );
  const [showModal, setShowModal] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Form state
  const [path, setPath] = useState("/api/v1/");
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [statusCode, setStatusCode] = useState(200);
  const [responseBody, setResponseBody] = useState(
    '{\n  "message": "success"\n}',
  );
  const [latencyMs, setLatencyMs] = useState(100);
  const [description, setDescription] = useState("");

  const currentEndpoint =
    endpoints.find((e) => e.id === selectedEpId) || endpoints[0];

  const handleTestRequest = () => {
    if (!currentEndpoint) return;
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setTestResult({
        status: currentEndpoint.statusCode,
        latency: currentEndpoint.latencyMs,
        body: currentEndpoint.responseBody,
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsTesting(false);
    }, currentEndpoint.latencyMs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!path.trim()) return;
    onAddEndpoint({
      path,
      method,
      statusCode: Number(statusCode),
      responseBody,
      latencyMs: Number(latencyMs),
      description: description || "Custom mock endpoint",
    });
    setPath("/api/v1/");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6 flex flex-col font-mono">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <div>
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Mock Endpoints ({endpoints.length})
          </h2>
          <p className="text-[11px] text-slate-400">
            Select an endpoint to test live responses with simulated latency.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-lg shadow-cyan-950/50 cursor-pointer"
        >
          + New Mock Endpoint
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Create Mock Endpoint
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-100 text-xs"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Endpoint Path
                  </label>
                  <input
                    type="text"
                    required
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Method
                  </label>
                  <select
                    value={method}
                    onChange={(e: any) => setMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Status Code
                  </label>
                  <input
                    type="number"
                    value={statusCode}
                    onChange={(e) => setStatusCode(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Simulated Latency (ms)
                  </label>
                  <input
                    type="number"
                    value={latencyMs}
                    onChange={(e) => setLatencyMs(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Endpoint purpose..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Response JSON Body
                </label>
                <textarea
                  rows={5}
                  value={responseBody}
                  onChange={(e) => setResponseBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 focus:outline-none resize-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500"
                >
                  Save Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Grid: Endpoints list & Live Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Endpoints Sidebar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3 h-fit">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
            Registered Routes
          </h3>
          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div
                key={ep.id}
                onClick={() => setSelectedEpId(ep.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedEpId === ep.id
                    ? "bg-cyan-950/40 border-cyan-500/50 text-slate-100 shadow-md"
                    : "bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="space-y-1 overflow-hidden pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${methodColors[ep.method]}`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-xs font-bold text-slate-200 truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">
                    {ep.description}
                  </p>
                </div>
                {endpoints.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEndpoint(ep.id);
                    }}
                    className="text-slate-600 hover:text-rose-400 text-xs px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Tester Console */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
          {currentEndpoint ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded border ${methodColors[currentEndpoint.method]}`}
                  >
                    {currentEndpoint.method}
                  </span>
                  <span className="text-sm font-bold text-slate-100">
                    {currentEndpoint.path}
                  </span>
                </div>
                <button
                  onClick={handleTestRequest}
                  disabled={isTesting}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors shadow-lg shadow-cyan-950/50 cursor-pointer"
                >
                  {isTesting ? "Simulating Request..." : "Send Test Request ⚡"}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">
                    Status Code
                  </span>
                  <strong className="text-emerald-400 font-bold">
                    {currentEndpoint.statusCode} OK
                  </strong>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">
                    Simulated Latency
                  </span>
                  <strong className="text-cyan-400 font-bold">
                    {currentEndpoint.latencyMs} ms
                  </strong>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">
                    Content Type
                  </span>
                  <strong className="text-purple-400 font-bold">
                    application/json
                  </strong>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Response Payload Preview
                </h4>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 relative">
                  <pre className="text-xs text-cyan-300 font-mono overflow-x-auto">
                    <code>{currentEndpoint.responseBody}</code>
                  </pre>
                </div>
              </div>

              {testResult && (
                <div className="space-y-2 pt-2 border-t border-slate-800 animate-fadeIn">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400">
                      ✓ Response Received ({testResult.timestamp})
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Latency: {testResult.latency}ms | Status:{" "}
                      {testResult.status}
                    </span>
                  </div>
                  <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4">
                    <pre className="text-xs text-emerald-300 font-mono overflow-x-auto">
                      <code>{testResult.body}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 text-xs">
              No endpoint selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
