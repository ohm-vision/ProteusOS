// src/guards/internal-host.guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InternalOnly implements CanActivate {
    static isInternal({ hostname }: Request) {
        return hostname === "agent"; // Specify the allowed internal host
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        if (InternalOnly.isInternal(request)) {
            return true;
        }

        if (process.env.NODE_ENV === "development") throw new ForbiddenException("Endpoint may only be accessed internally");

        return false;
    }
}