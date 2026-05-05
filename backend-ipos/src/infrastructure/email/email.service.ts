import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ibrittcontact@gmail.com',
      pass: 'uvpn wlhr uaxu yvon',
    },
  });

  async sendOtp(email: string, otp: string) {
    await this.transporter.sendMail({
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`,
    });
  }

  async sendResetLink(email: string, link: string) {
    await this.transporter.sendMail({
      to: email,
      subject: 'Reset Password',
      text: `Click here to reset password: ${link}`,
    });
  }
}
