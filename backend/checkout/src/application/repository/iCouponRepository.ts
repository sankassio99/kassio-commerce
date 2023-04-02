import Coupon from "../../domain/entities/Coupon";

export default interface ICouponRepository {
    get(id : String): Promise<Coupon>;
}