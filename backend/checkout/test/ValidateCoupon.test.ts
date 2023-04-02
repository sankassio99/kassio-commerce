import ICouponRepository from "../src/application/repository/iCouponRepository";
import ValidateCoupon from "../src/application/usecase/ValidateCoupon";
import CouponRepositoryFake from "../src/infra/repository/couponRepositoryFake";

let validateCoupon: ValidateCoupon;
let couponRepository: ICouponRepository;

beforeEach(function () {
	couponRepository = new CouponRepositoryFake();
	validateCoupon = new ValidateCoupon(couponRepository);
});

test("Must validate a valid dicount coupon", async function () {
	const input = "VALE20"
	const output = await validateCoupon.execute(input);
	expect(output).toBeTruthy();
});

test("Must validate a expired discount coupon", async function () {
	const input = "VALE10"
	const output = await validateCoupon.execute(input);
	expect(output).toBeFalsy();
});
