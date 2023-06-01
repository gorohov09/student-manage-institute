import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					console.log(err);
				} else if (payload) {
					console.log('Почти попали');
					if (payload && typeof payload !== 'string') {
						console.log('Попали');
						req.user = payload.email;
					}
				}
			});
		}
		next();
	}
}
