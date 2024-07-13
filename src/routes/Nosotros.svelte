<main class="rl">
	<svg id="leaf-1" width="400" height="400" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M354.167 166.667C166.667 208.333 122.917 336.875 79.5834 444.583L118.958 458.333L139.792 410.417C148.392 413.817 157.449 415.923 166.667 416.667C395.833 416.667 458.333 62.5 458.333 62.5C437.5 104.167 291.667 109.375 187.5 130.208C83.3334 151.042 41.6667 239.583 41.6667 281.25C44.5464 310.69 57.4116 338.258 78.125 359.375C145.833 166.667 354.167 166.667 354.167 166.667Z" fill="#fff0d1"/>
	</svg>
	<svg id="leaf-2" width="400" height="400" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M465.027 23.5801C458.437 20.1582 405.723 60.711 284.066 89.0938C224.948 102.886 61.0352 149.929 63.7559 383.608L0 421.111L19.8613 455.875C81.4561 416.137 250.344 338.646 420.023 139.839C420.023 139.839 393.778 271.107 93.7578 443.604C195.013 496.103 337.512 496.103 446.276 368.599C555.025 241.102 465.027 23.5801 465.027 23.5801Z" fill="#fff0d1"/>
	</svg>
	<div class="rl ma">
		<h1 class="title">Nuestra Historia</h1>
		<p class="hero">
			Fundada en 2021, <span>Kombucha Gaudí</span> nace de una pasión por la salud y el
			bienestar, junto con un profundo amor por los sabores locales de
			Arequipa. Utilizamos ingredientes orgánicos, cultivados bajo el sol
			arequipeño, para fermentar nuestra kombucha, asegurando que cada lote
			sea excepcionalmente bueno y beneficioso. Nuestro compromiso es con la calidad,
			la sostenibilidad y la comunidad local.
		</p>
		<p>
			Nuestra CEO, Vanessa Casadey, es una joven emprendedora cuya visión y
			dinamismo están al frente de <span>Kombucha Gaudí</span>. Vanessa lidera un equipo de
			profesionales dedicados, uniendo esfuerzos para ofrecer una experiencia
			única en salud y bienestar a través de nuestros productos.
		</p>
		<p>
			Apasionada por explorar y compartir nuevos horizontes, Vanessa viaja e
			investiga constantemente, buscando las mejores prácticas y los
			ingredientes más efectivos para incorporar en nuestra kombucha. Su
			vitalidad y compromiso no solo inspiran a nuestro equipo, sino que
			también se reflejan en cada aspecto de nuestra empresa, promoviendo una
			vida saludable y activa para todos nuestros clientes.
		</p>
		<div class="cols">
			<section>
				<h1>Beneficios de la Kombucha</h1>
				<p>
					La kombucha es una <span>bebida fermentada</span> reconocida por sus
					múltiples beneficios para la salud. Rica en probióticos, ayuda a
					fortalecer el sistema digestivo y a mejorar la flora intestinal.
				</p>
				<p>
					Además, es conocida por sus propiedades antioxidantes que
					combaten los radicales libres, contribuyendo a una mejor salud
					del sistema inmunológico. Su contenido en ácidos orgánicos puede
					promover la desintoxicación del cuerpo, lo que la convierte en
					una excelente opción para mantener un bienestar general.
				</p>
			</section>
			<section>
				<h1>¿Dónde Nos Encuentras?</h1>
				<p>
					Puedes encontrar nuestros productos de <span>Kombucha Gaudí</span> en una
					variedad de supermercados selectos, puntos de venta estratégicos
					en toda la ciudad, y a través de nuestros embajadores de marca.
				</p>
				<p>
					Estos últimos son apasionados por la salud y el bienestar y
					están siempre listos para compartir los beneficios únicos de
					nuestra kombucha. Busca nuestro distintivo logo y disfruta de la
					frescura y calidad en cada botella.
				</p>
				<a href="/tienda" class="btn btn-main">
					Pide Kombucha Gaudí
				</a>
			</section>
		</div>
	</div>
</main>

<style>
	svg {
		position: absolute;
	}
	#leaf-1 {
		top: 10%;
		left: 0;
	}
	#leaf-2 {
		bottom: 10%;
		right: 0;
	}
	.ma {
		max-width: 900px;
		padding-top: 64px;
		padding-bottom: 144px;
	}
	p {
		font-family: 'Lora', serif;
		font-size: 18px;
		line-height: 32px;
	}
	p.hero {
		font-family: inherit;
		font-size: 20px;
		line-height: 1.7;
		font-weight: 200;
	}
	span {
		font-weight: 600;
	}
	.cols {
		display: flex;
		align-items: start;
		gap: 32px;
	}
	.cols>* {
		flex: 1;
	}
	@media (max-width: 1000px) {
		svg {
			width: 300px;
		}
		.ma {
			padding-top: 16px;
			padding-bottom: 64px;
		}
	}
	@media (max-width: 700px) {
		.cols {
			flex-direction: column;
			gap: 0;
		}
		p.hero {
			font-size: 18px;
		}
	}
</style>