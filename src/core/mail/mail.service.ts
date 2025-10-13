// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as React from 'react';
import { pretty, render, toPlainText } from '@react-email/render'; // For rendering React components to HTML

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your email service (e.g., SMTP, Gmail, SendGrid)
      host: 'localhost',
      port: 1025,
      secure: false, // true for 465, false for other ports
      // auth: {
      //   user: 'your_email@example.com',
      //   pass: 'your_email_password',
      // },
    });
  }

  async sendEmail(to: string, subject: string, template: React.ReactElement) {
    const html = await pretty(await render(template)); // Render React component to HTML

    await this.transporter.sendMail({
      from: '"BluuPay" <support@bluupay.co>', // sender address
      to,
      subject,
      html,
      text: toPlainText(html)
    });
  }
}