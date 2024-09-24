import { NextFunction, Request, Response } from 'express'
import { Project } from '../../domain/entities/Project'
import { AppDataSource } from '../../infrastructure/dbConnection'

export class ProjectController {
  private projectRepository = AppDataSource.getRepository(Project)

  async listUserProjectEndpoint(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req['currentUser'].id

      const projects = await this.projectRepository.find({
        relations: ['user'],
        where: {
          user: { id },
        },
      })

      return res.status(200).json({ projects })
    } catch (err) {
      next(err)
    }
  }
}
