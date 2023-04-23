import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UserCreateDTO } from 'src/modules/user/dto/create-user/user-create.dto';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMail(createUserDto: UserCreateDTO) {
    await this.queue.add('sendMail-job', createUserDto);
  }
}
