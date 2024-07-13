<script>
	let absolute = true
	let top = true
	function changePosition() {
		const scrollY = window.scrollY;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		const threshold2 = 64;
		const threshold1 = document.querySelector('#footer').clientHeight;

		if (scrollY + windowHeight > documentHeight - threshold1) {
			absolute = true;
			top = false;
		} else if (scrollY < threshold2) {
			absolute = true;
			top = true; 
		} else {
			absolute = false;
			top = false;
		}
	}
</script>

<svelte:window on:scroll={changePosition} />

<a class="smoothscroll" href="#top" class:absolute class:top>
	<div class="hide">VOLVER ARRIBA</div>
	<div class="container">
		<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M7.5 1.5l.354-.354L7.5.793l-.354.353.354.354zm-.354.354l4 4 .708-.708-4-4-.708.708zm0-.708l-4 4 .708.708 4-4-.708-.708zM7 1.5V14h1V1.5H7z" fill="currentColor"></path></svg>
	</div>
</a>

<style>
	.absolute {
		position: absolute !important;
	}
	.top {
		top: calc(100dvh - 120px + 38px);
		bottom: unset;
	}
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		text-decoration: none;
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: 1;
		color: var(--text);
	}
	.container {
		border: 1px solid var(--text);
		border-radius: 50%;
		padding: 12px;
	}
	.hide {
		font-weight: 400;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: .35em;
		transform: rotate(180deg);
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}
	@media (max-width: 1000px) {
		.hide {
			display: none;
		}
	}
</style>