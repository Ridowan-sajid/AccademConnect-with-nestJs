import { MinLength } from 'class-validator';

export class PasswordChangeAdminDto {
  oldPassword: string;
  @MinLength(7)
  newPassword: string;
}
