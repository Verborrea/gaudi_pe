import { writable } from 'svelte/store';

const getInitialState = (key, plantilla) => {
	if (typeof localStorage !== 'undefined') {
		const storedState = localStorage.getItem(key);
		return storedState ? JSON.parse(storedState) : plantilla;
	}
	return plantilla;
};

function createCart() {
	const { subscribe, set, update } = writable(getInitialState('cart-v3', {
		items: [],
		quantity: 0,
		subtotal: 0,
		nro_latas: 0,
		showToast: false,
		allowDiscount: false
	}));

	if (typeof localStorage !== 'undefined') {
		subscribe((state) => {
			localStorage.setItem('cart-v3', JSON.stringify(state));
		});
	}

	return {
		subscribe,
		set,
		addItem: (productId, price, discount, measure) =>
			update((state) => {
				// Añadir producto a la lista
				const total = price * (1 - discount)
				const index = state.items.findIndex((item) =>
					(item.id === productId && item.t === total)
				);

				if (index !== -1) {
					state.items[index].q += 1;
				} else {
					state.items.push({
						id: productId,
						t: total,
						q: 1,
						m: measure,
						d: false // es un elemento con descuento por 6pack?
					});
				}

				// Actualizar subtotal y cantidad de productos
				state.subtotal += total;
				state.quantity += 1;
				
				// Lógica de promo x six-pack
				const six = 6;
				const promoDiscount = 0.16;
			
				if (state.allowDiscount && measure === 'lata') {
					state.nro_latas += 1;
					if (state.nro_latas < six) {
						return state;
					}
					state.nro_latas = 0;
			
					// Actualizar total de las últimas 6 latas
					let latas = state.items.filter(item => item.m === 'lata');
					let [sinPromo, conPromo] = latas.reduce((acc, item) => {
						if (item.t === price * (1 - discount)) {
							acc[0].push(item);
						} else {
							acc[1].push(item);
						}
						return acc;
					}, [[], []]);
			
					// Aplicar el descuento a las latas sin promo
					for (let lata of sinPromo) {
						const promoIndex = conPromo.findIndex(item => item.id === lata.id);
						if (promoIndex !== -1) {
							conPromo[promoIndex].q += lata.q;
							state.items = state.items.filter(item => !(item.id === lata.id && item.t === lata.t));
						} else {
							const pos = state.items.findIndex(i => i.id === lata.id && i.t === lata.t);
							state.items.splice(pos, 1, {
								id: lata.id,
								t: price * (1 - promoDiscount),
								q: lata.q,
								m: 'lata',
								d: true
							});
						}
					}
					state.subtotal -= six * price * (promoDiscount - discount);
					state.showToast = true;
				}

				return state;
			}),
		removeItem: (productId, discount) =>
			update((state) => {
				const itemIndex = state.items.findIndex(item => item.id === productId);

				// Si el producto no existe, no hacer nada
				if (itemIndex === -1) {
					return state; 
				}

				// Lógica de promo x six-pack
				const six = 6;
				const promoDiscount = 0.16;

				state.quantity -= 1;

				// obtener datos del elemento?
				const { id, t, q, m } = state.items[itemIndex];

				// si no es una lata
				if (state.allowDiscount === false || m !== 'lata') {
					if (q > 1) {
						state.items[itemIndex].q -= 1;
					} else {
						state.items.splice(itemIndex, 1);
					}
					state.subtotal -= t;
					return state;
				}

				// si es una lata:

				// 1. existe alguna lata libre del mismo sabor?
				const freeSameIdIndex = state.items.findIndex(item =>
					(item.id === productId && item.d === false)
				);
				if (freeSameIdIndex !== -1) {		
					const lata = state.items[freeSameIdIndex];
					if (state.items[freeSameIdIndex].q > 1) {
						state.items[freeSameIdIndex].q -= 1;
					} else {
						state.items.splice(freeSameIdIndex, 1);
					}
					state.nro_latas -= 1;
					state.subtotal -= lata.t;
					return state;
				}

				// 2. existe cualquier otra lata libre?
				if (state.nro_latas > 0) {

					// quitar toRemove
					const toRemoveIndex = state.items.findIndex(item =>
						(item.id === productId && item.d === true)
					);
					const toRemovePrice = state.items[toRemoveIndex].t
					if (state.items[toRemoveIndex].q > 1) {
						state.items[toRemoveIndex].q -= 1;
					} else {
						state.items.splice(toRemoveIndex, 1);
					}

					// quitar free
					const freeIndex = state.items.findIndex(item =>
						(item.d === false && item.m === 'lata')
					);
					const free = state.items[freeIndex]
					if (state.items[freeIndex].q > 1) {
						state.items[freeIndex].q -= 1;
					} else {
						state.items.splice(freeIndex, 1);
					}

					// añadir una con descuento igual a la free
					const sameIdOfFreeIndex = state.items.findIndex((item) =>
						(item.id === free.id && item.d === true)
					);

					if (sameIdOfFreeIndex !== -1) {
						state.items[sameIdOfFreeIndex].q += 1;
					} else {
						state.items.push({
							id: free.id,
							t: toRemovePrice,
							q: 1,
							m: 'lata',
							d: true // esta sí tiene descuento
						});
					}

					// Actualizar variables
					state.nro_latas -= 1
					state.subtotal -= free.t
					return state
				}

				// 3. no hay latas libres

				// Reducir la cantidad del elemento actual o eliminar si quantity ya es 1
				if (q > 1) {
					state.items[itemIndex].q -= 1;
				} else {
					state.items.splice(itemIndex, 1);
				}

				// Inicializar contadores para las latas procesadas
				let remainingQty = 5;
				const priceWithoutDiscount = t / (1 - promoDiscount) * (1 - discount);

				// Quitar el descuento de las primeras 5 latas que encuentres
				for (let i = 0; i < state.items.length && remainingQty > 0; i++) {
					const item = state.items[i];
					if (item.m === 'lata' && item.d === true) {
						const qtyToConvert = Math.min(remainingQty, item.q);

						if (item.q === qtyToConvert) {
							// Convertir todo el item a precio sin descuento
							state.items.splice(i, 1, {
								id: item.id,
								t: priceWithoutDiscount,
								q: item.q,
								m: 'lata',
								d: false,
							});
						} else {
							// Reducir la cantidad del item con descuento y añadir uno sin descuento
							state.items[i].q -= qtyToConvert;
							state.items.push({
								id: item.id,
								t: priceWithoutDiscount,
								q: qtyToConvert,
								m: 'lata',
								d: false,
							});
						}
						remainingQty -= qtyToConvert;
					}
				}

				// Actualizar subtotal y número de latas libres
				state.subtotal -= 6 * t;
				state.subtotal += 5 * priceWithoutDiscount;
				state.nro_latas = 5;

				return state;
			}),
		clear: (allowDiscount) =>
			update((state) => {
				state.quantity = 0;
				state.items = [];
				state.nro_latas = 0;
				state.subtotal = 0;
				state.showToast = false;
				state.allowDiscount = allowDiscount;

				return state;
			}),
		resetToast: () =>
			update((state) => {
				state.showToast = false;
				
				return state;
			})
	};
}

function createEnvio() {
	const { subscribe, set, update } = writable(getInitialState('envio', {
		isSet: false,
		price: 0,
		coords: null,
		dia: "Miércoles"
	}));

	if (typeof localStorage !== 'undefined') {
		subscribe((state) => {
			localStorage.setItem('envio', JSON.stringify(state));
		});
	}

	return {
		subscribe,
		set,
		update
	}
}

function createInfo() {
	const { subscribe, set, update } = writable(getInitialState('info', {
		name: '',
		address: '',
		phone: '+51 ',
		email: '',
		notes: ''
	}));

	if (typeof localStorage !== 'undefined') {
		subscribe((state) => {
			localStorage.setItem('info', JSON.stringify(state));
		});
	}

	return {
		subscribe,
		set,
		update
	}
}

export const cart = createCart();
export const envio = createEnvio();
export const info = createInfo();