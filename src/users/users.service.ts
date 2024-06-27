import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./dto/User";
import { Repository } from "typeorm";
import { UserDto } from "./dto/UserDto";
import { UserUpdateDto } from "./dto/UserUpdateDto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    /*Esto es para buscar por email para el login*/
    async getByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    create(createUsuarioDto: UserDto) {
        return this.userRepository.save(createUsuarioDto);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    async update(id: number, userUpdateDto: UserUpdateDto) {
        await this.userRepository.update(id, userUpdateDto);
        return this.userRepository.findOneBy({ id });
    }

    async remove(id: number) {
        await this.userRepository.delete(id);
    }
}
