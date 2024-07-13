import nodemailer from 'nodemailer';

// Configura el transportador SMTP con los detalles de Brevo
export let transporter = nodemailer.createTransport({
	host: 'gaudi.pe',
	port: 465,
	secure: true,
	auth: {
		user: 'mail@gaudi.pe',
		pass: 'Gaudi2024$'
	}
});