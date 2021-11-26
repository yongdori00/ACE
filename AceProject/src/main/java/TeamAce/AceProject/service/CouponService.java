package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.*;
import TeamAce.AceProject.dto.CouponDto;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.repository.CouponRepository;
import TeamAce.AceProject.repository.FundingRepository;
import TeamAce.AceProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final FundingRepository fundingRepository;
    private final UserRepository userRepository;

    //쿠폰사용버튼 클릭시 쿠폰의 상태변경기능
    @Transactional
    public void updateCouponStatus(Long id) {
        Coupon findCoupon = couponRepository.findById(id).get();
        findCoupon.couponStatusUpdate();
    }

    //쿠폰내역함에 뿌려줄 자신의 모든 쿠폰데이터
    @Transactional
    public List<CouponDto> getCouponList(Long id) {
        User findUser = userRepository.findById(id).get();
        List<Coupon> myCoupons = findUser.getCoupons();
        List<CouponDto> myCouponList = new ArrayList<>();

        for (Coupon myCoupon : myCoupons) {
            CouponDto couponDto = myCoupon.toDto(myCoupon);
            myCouponList.add(couponDto);
        }

        return myCouponList;
    }

    //펀딩정보를 바탕으로 각 유저마다 쿠폰을 만들어주는 서비스
    @Transactional
    public void createCoupon(Funding funding){

        List<UserFunding> userFundings = funding.getUserFundings();

        for (UserFunding userFunding : userFundings) {
            User user = userFunding.getUser();
            Coupon coupon = funding.FundingToCoupon(funding);
            user.addCoupon(coupon);
            couponRepository.save(coupon);
        }
    }

}
