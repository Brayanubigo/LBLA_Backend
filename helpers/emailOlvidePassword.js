
import nodemailer from 'nodemailer';

const emailOlvidePassword= async(datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email, nombre, token} =datos;

      //enviar email
      const info = await transport.sendMail({
        from: "lblainsumos@gmail.com",
        to: email,
        subject: 'Reestablece tu Contraseña',
        text: 'Reestablece tu Contraseña',
        html: ` <p> Hola: ${nombre}, has solicitado reestablecer tu contraseña.</p>
        <p> Sigue el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a></p>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `

      });

      console.log('mensaje enviado: %s', info.messageId);
}

export default emailOlvidePassword;