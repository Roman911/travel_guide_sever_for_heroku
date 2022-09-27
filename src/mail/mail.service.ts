import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

@Injectable()
export class MailService {
  private accessToken: any;
  private oauth2Client: any;
  private transporter: any;
  constructor() {
    this.oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.GOOGLE_DEVELOPERS,
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    this.accessToken = new Promise((resolve, reject) => {
      this.oauth2Client.getAccessToken((err, token) => {
        try {
          resolve(token);
        } catch (error) {
          reject('Failed to create access token :(');
        }
      });
    });

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER,
        accessToken: this.accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.USER,
      to,
      subject: `Активація акаунта на ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1>Для активації перейдіть по силці</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}
