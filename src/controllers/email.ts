import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Email from "../models/email";

export default class emailController {
  static async sendEmail(req: Request, res: Response) {
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.NODEMAILER_EMAIL,
      subject: subject,
      text: `${email}\n${name}\n\n${message}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {

      new Email({
        name: name,
        email: email,
        subject: subject,
        message: message
      }).save();

      error ? console.log(error) : res.status(200).send(info)
    }
    )
  }
}