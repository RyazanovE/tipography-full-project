import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL, // Пример: yourname@gmail.com
        pass: process.env.GMAIL_PASSWORD, // Пароль приложения
      },
    });

    // Проверка соединения
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Ошибка SMTP соединения:', error);
      } else {
        console.log('SMTP соединение с Gmail успешно');
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(`Ошибка отправки письма: ${error.message}`);
    }
  }
}
