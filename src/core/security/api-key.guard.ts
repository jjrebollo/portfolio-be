import { createHash, timingSafeEqual } from 'node:crypto';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

const API_KEY_HEADER = 'x-api-key';

/**
 * Protects admin endpoints with a shared secret supplied via the `x-api-key`
 * header. The guard fails closed: if no `ADMIN_API_KEY` is configured, every
 * request is rejected. Comparison is constant-time to avoid timing attacks.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const configuredKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!configuredKey) {
      throw new UnauthorizedException('Admin API is not configured.');
    }

    const request = context.switchToHttp().getRequest<Request>();
    const providedKey = request.header(API_KEY_HEADER);

    if (!providedKey || !this.matches(providedKey, configuredKey)) {
      throw new UnauthorizedException('Invalid API key.');
    }

    return true;
  }

  private matches(provided: string, expected: string): boolean {
    // Hashing normalizes length so timingSafeEqual never throws and the
    // comparison itself does not leak the expected key's length.
    const providedHash = createHash('sha256').update(provided).digest();
    const expectedHash = createHash('sha256').update(expected).digest();

    return timingSafeEqual(providedHash, expectedHash);
  }
}
