import { User } from '../domain/model/user.entity';
import { UserResource } from './iam.response';

export class UserAssembler {
  static toEntity(resource: UserResource): User {
    return new User({
      id: resource.id,
      username: resource.username,
      email: resource.email,
      firstName: resource.firstName,
      lastName: resource.lastName,
      roles: resource.roles
    });
  }
}
