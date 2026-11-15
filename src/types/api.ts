export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface MockEndpoint {
  id: string;
  path: string;
  method: HttpMethod;
  statusCode: number;
  responseBody: string;
  latencyMs: number;
  description: string;
}

export interface TestResult {
  status: number;
  latency: number;
  body: string;
  timestamp: string;
}
