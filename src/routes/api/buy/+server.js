import { json } from "@sveltejs/kit"
import { transporter } from "$lib/transporter.js"

const template = `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Nuevo Pedido</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			background-color: #f4f4f4;
			color: #333;
			padding: 20px;
		}
		.container {
			width: 100%;
			max-width: 600px;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 8px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
		.header {
			text-align: center;
			margin-bottom: 20px;
		}
		.header h1 {
			margin: 0;
			font-size: 24px;
		}
		.content {
			line-height: 1.6;
		}
		.content p {
			margin: 10px 0;
		}
		.items {
			margin: 20px 0;
		}
		.items table {
			width: 100%;
			border-collapse: collapse;
		}
		.items th,
		.items td {
			border: 1px solid #ddd;
			padding: 8px;
			text-align: left;
		}
		.items th {
			background-color: #f4f4f4;
			font-weight: bold;
		}
		.total {
			font-weight: bold;
		}
		.map-link {
			margin: 10px 0;
		}
		.map-link a {
			color: #007BFF;
			text-decoration: none;
		}
		.map-link a:hover {
			text-decoration: underline;
		}
	</style>
</head>
<body>
	<table class="container" cellpadding="0" cellspacing="0" border="0" align="center">
		<tr>
			<td style="padding: 20px;" class="header">
				<h1>Nuevo Pedido</h1>
			</td>
		</tr>
		<tr>
			<td style="padding: 20px;" class="content">
				<p><strong>Nombre:</strong> {{name}}</p>
				<p><strong>Dirección:</strong> {{address}}</p>
				<p><strong>Teléfono Celular:</strong> {{phone}}</p>
				<p><strong>Email:</strong> {{email}}</p>
				<p><strong>Notas:</strong> {{notes}}</p>
				<p><strong>Coordenadas:</strong> Lng: {{lng}}, Lat: {{lat}}</p>
				<p class="map-link"><a href="https://www.google.com/maps/search/?api=1&query={{lat}},{{lng}}" target="_blank">Abrir en Google Maps</a></p>
				<div class="items">
					<p><strong>Artículos:</strong></p>
					<table>
						<tr>
							<th>CANT.</th>
							<th>ARTÍCULO</th>
							<th>PRECIO</th>
						</tr>
						{{items}}
					</table>
				</div>
				<p><strong>Subtotal:</strong> {{subtotal}}</p>
				<p><strong>Costo de Envío:</strong> {{costo_envio}}</p>
				<p class="total"><strong>Total:</strong> {{total}}</p>
			</td>
		</tr>
		<tr>
			<td style="padding: 20px;" class="content"><img style="display: block; margin:auto; width: 75%;" src="{{yape}}" alt="Yape"></td>
		</tr>
	</table>
</body>
</html>`;

// Función para reemplazar variables en la plantilla
function replaceTemplate(template, data) {
	return template.replace(/{{(.*?)}}/g, (_, key) => {
		const value = data[key.trim()];

		if (key.trim() === 'lng' || key.trim() === 'lat') {
			return value || '';
		}

		if (key.trim() === 'coords' && Array.isArray(value)) {
			return `Lng: ${value[0]}, Lat: ${value[1]}`;
		}

		if (key.trim() === 'items' && Array.isArray(value)) {
			return value.map(item => 
				`<tr>
					<td>${item.quantity}</td>
					<td>${item.name}</td>
					<td>${(item.total * item.quantity).toFixed(2)}</td>
				</tr>`
			).join('');
		}

		return value || '';
	});
}


export async function POST({ request }) {
	const datos = await request.json();

	// Enviar correo al cliente
	transporter.sendMail({
		from: 'mail@gaudi.pe',
		to: datos.email,
		subject: 'Gaudí 🦎 - Gracias por su compra 😄!',
		text: `Hola ${datos.name.split(' ')[0]}. Gracias por su compra 😄 Su orden está siendo procesada. Le notificaremos apenas confirmemos su pago.`,
		html: `<h1>Hola ${datos.name.split(' ')[0]}</h1><h2>Gracias por su compra 😄</h2><h3>Su orden está siendo procesada.</h3><p>Le notificaremos apenas confirmemos su pago.</p>`
	}, (error, _) => {
		if (error) {
			return json({
				status: "error",
				error: {
					code: 500,
					message: error
				}
			});
		}
	});

	// Enviar correo al admin con detalles de la compra
	transporter.sendMail({
		from: 'mail@gaudi.pe',
		to: 'admin@gaudi.pe,markomanrique@gmail.com,vanecasadey@gmail.com',
		subject: `Nuevo Pedido de ${datos.name}`,
		html: replaceTemplate(template, datos)
	}, (error, _) => {
		if (error) {
			return json({
				status: "error",
				error: {
					code: 500,
					message: error
				}
			});
		}
	});
		
	return json({
		status: "success",
		message: "El mail se envió correctamente"
	});
}