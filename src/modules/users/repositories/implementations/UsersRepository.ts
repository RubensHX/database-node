import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return this.repository.createQueryBuilder().select("users").from(User, "users").innerJoin("users.games", "games").where("users.id = :id", { id: user_id }).getOneOrFail();
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(" select first_name from users order by first_name asc "); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const parameters = [ first_name, last_name ];
    return this.repository.query(" select * from users where (first_name like :first_name and last_name like :last_name) ", parameters); // Complete usando raw query
  }
}
