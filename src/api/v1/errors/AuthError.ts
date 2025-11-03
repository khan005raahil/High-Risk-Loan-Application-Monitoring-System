import { BaseError } from './BaseError';
export class AuthError extends BaseError {
  constructor(message = 'Authentication error') {
    super(message, 401);
  }
}
