import type { GeneratedFile, OperationType } from './types';
import {
  IMPLEMENTED_OPERATIONS,
  getToolStubMessage,
  isToolReady,
  isToolStub,
} from './toolRegistry';
import {
  LEGACY_TOOL_HANDLERS,
  TOOL_HANDLERS,
  type RunToolsContext,
} from './tools/handlers';

export type { RunToolsContext };

export function assertOperationImplemented(op: OperationType): void {
  if (!IMPLEMENTED_OPERATIONS.has(op) && !isToolStub(op)) {
    throw new Error('Unsupported offline processor target sequence selection.');
  }
}

export async function runConversion(ctx: RunToolsContext): Promise<GeneratedFile[]> {
  assertOperationImplemented(ctx.selectedOperation);

  if (isToolStub(ctx.selectedOperation)) {
    throw new Error(getToolStubMessage(ctx.selectedOperation, ctx.lang ?? 'en'));
  }

  const handler = TOOL_HANDLERS[ctx.selectedOperation];
  if (!handler) {
    throw new Error('Unsupported offline processor target sequence selection.');
  }

  try {
    return await handler(ctx);
  } catch (e: unknown) {
    if (e instanceof DOMException && e.name === 'AbortError') throw e;

    const legacy = LEGACY_TOOL_HANDLERS[ctx.selectedOperation];
    if (!legacy || legacy === handler) throw e;

    try {
      return await legacy(ctx);
    } catch {
      throw e;
    }
  }
}

export function isOperationRunnable(op: OperationType): boolean {
  return isToolReady(op) || isToolStub(op);
}
