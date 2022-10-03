import nodemailer from "nodemailer";
import { IUser } from "../models/user";
import { generateToken } from "./token-config";

const transporter = nodemailer.createTransport({
	sendmail: true,
	newline: 'unix',
	path: '/usr/sbin/sendmail',
})

export const sendVerifyEmail = async (user: IUser) => {
    // NOTE generated tokens expire in 1 hour
    const key = generateToken(user);
    
    const mailOptions = {
        from: '"TTT Emailer" <cse356tttemailer@test.com>',
        to: user.email,
        subject: "Verify Your Account",
        text:`${process.env.CLIENT_ORIGIN}/verify?email=${encodeURIComponent(user.email)}&key=${key}`
    };
    // console.log(`${process.env.CLIENT_ORIGIN}/verify?email=${encodeURIComponent(user.email)}&key=${key}`)
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return "ERROR";
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });

    return "OK";
};
