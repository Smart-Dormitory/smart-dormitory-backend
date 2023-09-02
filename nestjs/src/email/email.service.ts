import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASSWORD,
      },
    });
  }

  async sendPasswordResetEmail(
    emailAddress: string,
    temporaryPassword: string,
  ) {
    const htmlTemplate = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="font-family: Arial, sans-serif; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #007bff; text-align: center; margin-bottom: 20px;">비밀번호 재설정</h2>
                <p>임시 비밀번호: <strong>${temporaryPassword}</strong></p>
            </div>
        </div>
    `;
    const mailOptions: Mail.Options = {
      to: emailAddress,
      subject: '비밀번호 재설정',
      html: htmlTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('이메일 전송 중 오류가 발생했습니다.');
    }
  }
}
