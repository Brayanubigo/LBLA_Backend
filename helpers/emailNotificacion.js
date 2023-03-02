
import nodemailer from 'nodemailer';

const emailNotificacion= async(datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email, nombre, tipo, cantidad, curso, asignatura, descripcion} =datos;

      //enviar email
      const info = await transport.sendMail({
        from: `lblainsumos@gmail.com`,
        to: email,
        subject: `SOLICITUD DE ${nombre} DEL CURSO ${curso} `,
        text: 'Notificacion de solicitud',
        html: ` <p> Hola: Carlos, El profesor ${nombre} del curso ${curso} .</p>
        <p> ha solicitado  ${tipo} con una cantidad de ${cantidad} para la Asignatura de ${asignatura} .</p>
        <p> con descripcion de: ${descripcion} .</p>
        <a href="${process.env.FRONTEND_URL}/admin/ver-soli">Ver Solicitudes</a></p> 

        <p>Este es un mensaje para notificar una solicitud</p>
        `

      });

      console.log('mensaje enviado: %s', info.messageId);
}

export default emailNotificacion;