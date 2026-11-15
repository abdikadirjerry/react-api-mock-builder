import type { MockEndpoint } from "../types/api";

export const INITIAL_ENDPOINTS: MockEndpoint[] = [
  {
    id: "ep-1",
    path: "/api/v1/telemetry",
    method: "GET",
    statusCode: 200,
    responseBody:
      '{\n  "status": "healthy",\n  "activeNodes": 12,\n  "uptimeSec": 48291\n}',
    latencyMs: 120,
    description: "Fetch system health and active node telemetry.",
  },
  {
    id: "ep-2",
    path: "/api/v1/auth/token",
    method: "POST",
    statusCode: 201,
    responseBody:
      '{\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "expiresIn": 3600\n}',
    latencyMs: 250,
    description: "Authenticate developer credentials and return session token.",
  },
  {
    id: "ep-3",
    path: "/api/v1/vulnerabilities",
    method: "GET",
    statusCode: 200,
    responseBody:
      '[\n  { "id": "CVE-2026-9912", "severity": "Critical", "service": "api-gateway" }\n]',
    latencyMs: 80,
    description: "Retrieve logged security incidents and CVE vectors.",
  },
];
