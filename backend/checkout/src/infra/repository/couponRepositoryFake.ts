import ICouponRepository from "../../application/repository/iCouponRepository";
import Coupon from "../../domain/entities/Coupon";
import data from "../data/data";


export default class CouponRepositoryFake implements ICouponRepository{
    async get(code: String): Promise<Coupon> {
        const coupon = data.jsonCoupons.find((coupon) => coupon.code == code);
        if(!coupon){
            throw new Error(`Coupon not found`);
        }
        return new Coupon(coupon.code, coupon.value, new Date(coupon.expireDate));
    }
}