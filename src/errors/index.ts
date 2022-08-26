import { z } from 'zod';
import { RemoteError } from '../api';
import { MPPError } from './mpp_error';
import { TokenError } from './token_error';

function isMPPError(err: unknown): err is z.infer<typeof MPPError> {
  return !!(
    (err as z.infer<typeof MPPError>).error_description && (err as z.infer<typeof MPPError>).error
  );
}

function isTokenError(err: unknown): err is z.infer<typeof TokenError> {
  return !!((err as z.infer<typeof TokenError>).title && (err as z.infer<typeof TokenError>).type);
}

export function isExternalError(err: unknown): err is RemoteError {
  return isMPPError(err) || isTokenError(err);
}

export function isGatewayError(err: unknown): err is string {
  return typeof err === 'string';
}
