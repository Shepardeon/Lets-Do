import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../../data-source'
import { Project } from '../../../entities/Project'

export const listUserProjectEndpoint = async (
  req: Request,
  rep: Response,
  next: NextFunction
) => {
  try {
    const id = req['currentUser'].id
    const projectRepository = AppDataSource.getRepository(Project)

    const projects = await projectRepository.find({
      relations: ['user'],
      where: {
        user: { id },
      },
    })

    rep.status(200).json({ projects })
  } catch (err) {
    next(err)
  }
}
