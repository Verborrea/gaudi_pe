<script>
	let file;
	let dragover = false;
	let dragCounter = 0;
	let imageUrl = "";
	export let ready = false, yape;

	function handleFileChange(event) {
		const fileInput = event.target;
		file = fileInput.files[0];
		updateImageUrl(file);
	}

	function handleDrop(event) {
		event.preventDefault();
		dragCounter = 0;
		dragover = false;
		file = event.dataTransfer.files[0];
		updateImageUrl(file);
	}

	function handleDragEnter(event) {
		dragCounter++;
		dragover = true;
	}

	function handleDragLeave(event) {
		dragCounter--;
		if (dragCounter === 0) {
			dragover = false;
		}
	}

	function updateImageUrl(file) {
		const reader = new FileReader();
		
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;

			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Redimensionar al 50%
				const width = img.width * 0.5;
				const height = img.height * 0.5;

				canvas.width = width;
				canvas.height = height;

				ctx.drawImage(img, 0, 0, width, height);
				
				imageUrl = canvas.toDataURL('image/webp', 0.75);
				canvas.toBlob((blob) => {
					yape = new File([blob], 'image.webp', { type: 'image/webp' });
					console.log('File creado:', yape);
				}, 'image/webp', 0.75);

				ready = true;
			};
		};

		reader.readAsDataURL(file);
	}
</script>

<label for="ss">
	<article
		class="container"
		on:dragover={(e) => {
			e.preventDefault();
		}}
		on:drop={handleDrop}
		on:dragenter={handleDragEnter}
		on:dragleave={handleDragLeave}
		class:dragover
	>
		{#if !imageUrl}
		<svg xmlns="http://www.w3.org/2000/svg" height="96px" viewBox="0 -960 960 960" width="96px" fill="#737373"><path d="M254.38-185q-79.92 0-135.65-55.17Q63-295.33 63-375.15q0-73.02 50.88-128.47 50.89-55.46 120.12-60.46 14.77-91.3 85.01-151 70.25-59.69 162.22-59.69 101.59 0 171.76 70.36 70.16 70.35 76.16 171.18v51.69h24.62q60.92 2.23 102.08 43.62Q897-396.54 897-334.15q0 61.75-42.93 105.45T749.38-185H527q-28.42 0-48.4-20.3-19.98-20.3-19.98-48.08v-242.47l-88 87.77-31.24-30.46L480-579.15l141.62 140.61-31.24 30.46-88-87.77v242.47q0 9.23 7.7 16.92 7.69 7.69 16.92 7.69h220.37q43.94 0 74.9-31.3 30.96-31.29 30.96-73.82 0-42.62-31.15-73.86-31.14-31.23-74.42-31.23h-62.54v-81.83q0-86.17-59.96-148.18Q565.21-731 478.79-731q-86.41 0-146.49 61.97-60.09 61.97-60.09 148.05h-21.34q-58.32 0-101.21 41.98-42.89 41.98-42.89 104.76 0 60.29 42.82 102.88 42.81 42.59 104.79 42.59h113.47V-185H254.38ZM480-458.62Z"/></svg>
		{:else}
			<img src={imageUrl} alt="Captura de Pantalla" />
		{/if}
		<p>Seleccione o arrastre una captura de pantalla de su pago aquí</p>
	</article>
</label>

<input
	type="file"
	accept="image/*"
	hidden
	name="ss"
	id="ss"
	on:change={handleFileChange}
/>

<style>
	img {
		width: 75%;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	p {
		color: var(--disabled);
	}
</style>
