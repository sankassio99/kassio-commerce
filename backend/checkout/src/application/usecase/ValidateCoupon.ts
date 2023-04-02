import ICouponRepository from "../repository/iCouponRepository";

export default class ValidateCoupon {
	
    /**
     *
     */
    constructor(readonly couponRepository: ICouponRepository) {
        
    }

    async execute(couponId: string) : Promise<boolean> {
		const coupon = await this.couponRepository.get(couponId);
        return !coupon.isExpired(new Date());
	}
}