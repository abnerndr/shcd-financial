import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService, { provide: 'UserInterface', useClass: UserService }],
  exports: ['UserInterface'],
})
export class UserModule {}
