import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { ensureAuthenticated } from "./router";

const emailRouter = Router();

 emailRouter.post("/send", (req: Request, res: Response) => {
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

  transporter.sendMail(mailOptions, (error, info) => error ? console.log(error) : res.status(200).send(info))
})

export default emailRouter;