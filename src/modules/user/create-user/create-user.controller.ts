import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from '../dto/create-user/user-create.dto';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

@Controller('create-user')
export class CreateUserController {
  constructor(private readonly mailService: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() createUser: UserCreateDTO) {
    await this.mailService.sendMail(createUser);

    return createUser;
  }
}
