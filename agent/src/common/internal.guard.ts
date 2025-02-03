import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class InternalOnly implements CanActivate {
    static isInternal({ hostname }: Request) {
        return hostname === "agent"; // Specify the allowed internal host
    }

    constructor(
        private readonly token: TokenService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        if (InternalOnly.isInternal(request)) {
            return true;
        }

        const clientId = (request.headers["x-client-id"] as string);

        const signature = (request.headers["x-signature"] as string);

        const payload = request.method === "GET" ? request.url : JSON.stringify(request.body);

        if (this.token.verify(clientId, signature, payload )) {
            return true;
        }

        if (process.env.NODE_ENV === "development") throw new ForbiddenException("Endpoint may only be accessed internally");

        return false;
    }
}