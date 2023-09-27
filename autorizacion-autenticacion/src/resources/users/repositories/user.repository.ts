import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
