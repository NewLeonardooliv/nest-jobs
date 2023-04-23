import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserCreatedDTO } from 'src/modules/user/dto/create-user/user-created.dto';

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<UserCreatedDTO>) {
    const { data } = job;
    console.log(data);

    await this.mailService.sendMail({
      to: data.email,
      from: 'Team Leonardo Oliveira LTDA <leonardo@leonardo.com.br>',
      subject: 'Welcome to Leonardo Oliveira LTDA',
      text: `Hello, welcome ${data.name}, your registration was successful!`,
    });
  }
}
