
import nodemailer from 'nodemailer';

const emailRegistro= async(datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls:{
          rejectUnauthorized: false
        }
      });
      const {email, nombre, token} = datos;

      //enviar email
      const info = await transport.sendMail({
        from: "lblainsumos@gmail.com",
        to: email,
        subject: 'Comprueba tu cuenta en LBLA SOLICITUDES',
        text: 'Comprueba tu cuenta en LBLA SOLICITUDES',
        html: ` <p> Hola: ${nombre}, comprueba tu cuenta en LBLA SOLICITUD.</p>
        <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `

      });

      console.log('mensaje enviado: %s', info.messageId);
}

export default emailRegistro;