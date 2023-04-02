import Product from "./Product";

// Freight calculator é uma entidate para o Clean Architecture porque é uma regra idependente
// poderia usar ele em varios lugares
export default class FreightCalculator {
	static calculate (product: Product, quantity : number = 1) {
		const volume = product.getVolume();
		const density = product.weight/volume;
		const itemFreight = 1000 * volume * (density/100);
		let freightValue = itemFreight * quantity;
		if(freightValue < 10){
			return 10
		}
		return freightValue;
	}
}
