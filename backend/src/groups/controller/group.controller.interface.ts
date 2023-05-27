import { NextFunction, Request, Response, Router } from 'express';

export interface IGroupController {
	createGroup(req: Request, res: Response, next: NextFunction): void;
	createStudent(req: Request, res: Response, next: NextFunction): void;
}
