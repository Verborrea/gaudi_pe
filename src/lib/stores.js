import { writable } from 'svelte/store';

const getInitialState = (key, plantilla) => {
	if (typeof localStorage !== 'undefined') {
		const storedState = localStorage.getItem(key);
		return storedState ? JSON.parse(storedState) : plantilla;
	}
	return plantilla;
};

function createCart() {
	const { subscribe, set, update } = writable(getInitialState('cart-v4', {
		items: [],
		quantity: 0,
		subtotal: 0,
		special: {},
		showToast: false,
	}));

	if (typeof localStorage !== 'undefined') {
		subscribe((state) => {
			localStorage.setItem('cart-v4', JSON.stringify(state));
		});
	}

	return {
		subscribe,
		set,
		addItem: (product) =>
			update((state) => {
				// Añadir producto a la lista
				const total = product.price * (1 - product.discount)
				const index = state.items.findIndex((item) =>
					(item.id === product.id && item.t === total)
				);

				if (index !== -1) {
					state.items[index].q += 1;
				} else {
					state.items.push({
						id: product.id,
						t: total,
						q: 1,
						m: product.measure,
						d: false // es un elemento con descuento por 6pack?
					});
				}

				// Actualizar subtotal y cantidad de productos
				state.subtotal += total;
				state.quantity += 1;
				
				// Lógica de promo especial x cantidad
				const promoDiscountQuantity = product.special_discount_quantity;
				const promoDiscount = product.special_discount;
			
				if (product.special_discount > 0) {
					if (product.measure in state.special ) {
						state.special[product.measure] += 1;
					} else {
						state.special[product.measure] = 1;
					}
					
					if (state.special[product.measure] < promoDiscountQuantity) {
						return state;
					}
					state.special[product.measure] = 0;
			
					// Actualizar total de los últimas 6 prods
					let latas = state.items.filter(item => item.m === product.measure);
					let [sinPromo, conPromo] = latas.reduce((acc, item) => {
						if (item.t === product.price * (1 - product.discount)) {
							acc[0].push(item);
						} else {
							acc[1].push(item);
						}
						return acc;
					}, [[], []]);
			
					// Aplicar el descuento a los prods sin promo
					for (let lata of sinPromo) {
						const promoIndex = conPromo.findIndex(item => item.id === lata.id);
						if (promoIndex !== -1) {
							conPromo[promoIndex].q += lata.q;
							state.items = state.items.filter(item => !(item.id === lata.id && item.t === lata.t));
						} else {
							const pos = state.items.findIndex(i => i.id === lata.id && i.t === lata.t);
							state.items.splice(pos, 1, {
								id: lata.id,
								t: product.price * (1 - promoDiscount),
								q: lata.q,
								m: 'lata',
								d: true
							});
						}
					}
					state.subtotal -= promoDiscountQuantity * product.price * (promoDiscount - product.discount);
					state.showToast = true;
				}

				return state;
			}),
		removeItem: (product) =>
			update((state) => {
				const itemIndex = state.items.findIndex(item => item.id === product.id);

				// Si el producto no existe, no hacer nada
				if (itemIndex === -1) {
					return state; 
				}

				// Lógica de promo x six-pack
				const promoDiscountQuantity = product.special_discount_quantity;
				const promoDiscount = product.special_discount;

				state.quantity -= 1;

				// obtener datos del elemento?
				const { id, t, q, m } = state.items[itemIndex];

				// si no tiene descuento especial
				if (product.special_discount === 0) {
					if (q > 1) {
						state.items[itemIndex].q -= 1;
					} else {
						state.items.splice(itemIndex, 1);
					}
					state.subtotal -= t;
					return state;
				}

				// si es una lata:

				// 1. existe algun producto igual desagrupado?
				const freeSameIdIndex = state.items.findIndex(item =>
					(item.id === product.id && item.d === false)
				);
				if (freeSameIdIndex !== -1) {		
					const lata = state.items[freeSameIdIndex];
					if (state.items[freeSameIdIndex].q > 1) {
						state.items[freeSameIdIndex].q -= 1;
					} else {
						state.items.splice(freeSameIdIndex, 1);
					}
					state.special[product.measure] -= 1;
					state.subtotal -= lata.t;
					return state;
				}

				// 2. existe cualquier otro prod libre?
				if (state.special[product.measure] > 0) {

					// quitar toRemove
					const toRemoveIndex = state.items.findIndex(item =>
						(item.id === product.id && item.d === true)
					);
					const toRemovePrice = state.items[toRemoveIndex].t
					if (state.items[toRemoveIndex].q > 1) {
						state.items[toRemoveIndex].q -= 1;
					} else {
						state.items.splice(toRemoveIndex, 1);
					}

					// quitar free
					const freeIndex = state.items.findIndex(item =>
						(item.d === false && item.m === product.measure)
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
							m: product.measure,
							d: true // esta sí tiene descuento
						});
					}

					// Actualizar variables
					state.special[product.measure] -= 1
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
				let remainingQty = promoDiscountQuantity - 1;
				const priceWithoutDiscount = t / (1 - promoDiscount) * (1 - product.discount);

				// Quitar el descuento de las primeras 5 latas que encuentres
				for (let i = 0; i < state.items.length && remainingQty > 0; i++) {
					const item = state.items[i];
					if (item.m === product.measure && item.d === true) {
						const qtyToConvert = Math.min(remainingQty, item.q);

						if (item.q === qtyToConvert) {
							// Convertir todo el item a precio sin descuento
							state.items.splice(i, 1, {
								id: item.id,
								t: priceWithoutDiscount,
								q: item.q,
								m: product.measure,
								d: false,
							});
						} else {
							// Reducir la cantidad del item con descuento y añadir uno sin descuento
							state.items[i].q -= qtyToConvert;
							state.items.push({
								id: item.id,
								t: priceWithoutDiscount,
								q: qtyToConvert,
								m: product.measure,
								d: false,
							});
						}
						remainingQty -= qtyToConvert;
					}
				}

				// Actualizar subtotal y número de latas libres
				state.subtotal -= promoDiscountQuantity * t;
				state.subtotal += (promoDiscountQuantity - 1) * priceWithoutDiscount;
				state.special[product.measure] = promoDiscountQuantity - 1;

				return state;
			}),
		clear: () =>
			update((state) => {
				state.items = [];
				state.quantity = 0;
				state.subtotal = 0;
				state.special = {};
				state.showToast = false;

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