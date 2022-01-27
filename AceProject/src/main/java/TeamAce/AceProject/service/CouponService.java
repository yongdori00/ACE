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


    //펀딩정보를 바탕으로 각 유저마다 쿠폰을 만들어주는 서비스
    @Transactional
    public void createCoupon(Funding funding){

        List<UserFunding> userFundingList = funding.getUserFundings();

        for (UserFunding userFunding : userFundingList) {
            User user = userFunding.getUser();
            Coupon coupon = funding.FundingToCoupon(funding);
            user.addCoupon(coupon);
            couponRepository.save(coupon);
        }
    }

}
