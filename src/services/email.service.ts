import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { inject } from '@loopback/context';
import { config } from '../commons';
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  type: 'smtp',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'nuoinguyen.hva@gmail.com',
    pass: 'gdzmjacqimgtjqex',
  },
  tls: {
    rejectUnauthorized: false, //force send with unauthorized
  }
});

@injectable({ scope: BindingScope.TRANSIENT })
export class EmailService {
  constructor() { }

  async sendEmail(from: string, to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: from,
      to: to,
      replyTo: config.EMAIL_SERVICE,
      subject: subject,
      html: text
    };
    
    try {
      let sendMailRes = await transporter.sendMail(mailOptions);
      return sendMailRes;
    }
    catch (err) {
      console.log('error sendMail data', err);
    }

  }
}
