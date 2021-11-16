package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.Funding;
import TeamAce.AceProject.domain.Restaurant;
import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.domain.UserFunding;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.repository.FundingRepository;
import TeamAce.AceProject.repository.RestaurantRepository;
import TeamAce.AceProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundingService {

    private final FundingRepository fundingRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;
    private final CouponService couponService;

    //새로운 펀딩 만들기
    public void createFunding(FundingDto fundingDto){
        Funding funding = fundingDto.toEntityFirst();
        Restaurant restaurant = restaurantRepository.findByRestaurantName(funding.getRestaurantName()).get();
        funding.setRestaurant(restaurant);

        fundingRepository.save(funding);
    }

    //펀딩정보를 페이지에 띄워주기
    public FundingDto getFunding(Long id){
        Funding findFunding = fundingRepository.findById(id).get();
        FundingDto fundingDto = findFunding.toDto(findFunding);
        return fundingDto;
    }


    //한 사람이 펀딩에 참여했을때 Funding의 userFunding 추가
    public void addUserFunding(Long userId , Long fundingId){
        User findUser = userRepository.findById(userId).get();
        Funding findFunding = fundingRepository.findById(fundingId).get();

        UserFunding createUserFunding = UserFunding.builder()
                .user(findUser)
                .funding(findFunding)
                .build();

        findFunding.addUserFunding(createUserFunding);
        findUser.addUserFunding(createUserFunding);
    }


    //한 사람이 펀딩에 참여했을때 nowFundingCount +1 해주는 메서드
    public void addNowFundingCount(Long fundingId){
        Optional<Funding> findFunding = fundingRepository.findById(fundingId);
        findFunding.get().addFundingCount();

    }


    //펀딩이 max에 도달한지 ,
    public void checkMaxFundingCount(Long fundingId){
        Funding findFunding = fundingRepository.findById(fundingId).get();
        if(findFunding.checkMaxFunding() == true){ //max에 도달했다면
            couponService.createCoupon(findFunding); //유저들에게 쿠폰발송
        }
    }

    //펀딩기간을 넘겼으면 min체크
    @Scheduled(cron = "0 0 0 * * *") // 매일 0시에 체크
    public void checkFundingDate(Long fundingId){
        Funding findFunding = fundingRepository.findById(fundingId).get();

        if(findFunding.checkFundingDate() == true) { //기간이 지났다면
            if (findFunding.checkMinFunding() == true) { //min을 넘겼다면
                couponService.createCoupon(findFunding);

            } else { //min을 못넘겼다면 , 유저에게 환불해줘야함

            }

        }

    }






}
