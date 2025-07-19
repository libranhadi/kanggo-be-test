
import models from '../model';
import User from '../model/User';

export class UserRepository {

  public async create(userData: Partial<User>): Promise<User> {
    const user = await models.User.create(userData);
    return user;
  }

  public async findById(id: number): Promise<User | null> {
    return await models.User.findByPk(id, {
      include: [
        {
          model: models.Role,
          as: 'roles', 
        },
        {
          model: models.Applicant,
          as: 'applicants', 
        },
      ],
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }
}
