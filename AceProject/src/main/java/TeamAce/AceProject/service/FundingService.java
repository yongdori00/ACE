package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.Funding;
import TeamAce.AceProject.domain.Restaurant;
import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.domain.UserFunding;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.dto.PageRequestDto;
import TeamAce.AceProject.repository.*;
import lombok.RequiredArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundingService {

    private final FundingRepository fundingRepository;
    private final UserFundingRepository userFundingRepository;
    private final UserRepository userRepository;
    private final CouponService couponService;


    //새로운 펀딩 만들기
    @Transactional
    public void createFunding(FundingDto fundingDto){
        Funding funding = fundingDto.toEntityFirst();
        fundingRepository.save(funding);
    }

    //펀딩정보를 페이지에 띄워주기
    public FundingDto getFunding(Long id){
        Funding findFunding = fundingRepository.findById(id).get();
        FundingDto fundingDto = findFunding.toDto();
        return fundingDto;
    }

    //펀딩리스트들 넘겨주기
    public Slice<FundingDto> getFundingList(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(pageRequestDto.getPage(), pageRequestDto.getSize());
        return fundingRepository.findAllCustom(pageable).map(funding -> funding.toDto());
    }

    public Page<FundingDto> getFundings(Pageable pageable){
        return fundingRepository.findAll( pageable).map(f -> f.toDto());

    }


    //한 사람이 펀딩에 참여했을때 Funding의 userFunding 추가
    @Transactional
    public void addUserFunding(Long userId , Long fundingId){
        User findUser = userRepository.findById(userId).get();
        Funding findFunding = fundingRepository.findById(fundingId).get();

        UserFunding createUserFunding = UserFunding.builder()
                .user(findUser)
                .funding(findFunding)
                .build();

        userFundingRepository.save(createUserFunding);
        /*
        findFunding.addUserFunding(createUserFunding);
        findUser.addUserFunding(createUserFunding);

         */
    }


    //한 사람이 펀딩에 참여했을때 nowFundingCount +1 해주는 메서드
    @Transactional
    public void addNowFundingCount(Long fundingId){
        Optional<Funding> findFunding = fundingRepository.findById(fundingId);
        findFunding.get().addFundingCount();

    }


    //펀딩이 max에 도달한지 ,
    @Transactional
    public boolean checkMaxFundingCount(Long fundingId){
        Funding findFunding = fundingRepository.findById(fundingId).get();
        if(findFunding.checkMaxFunding() == true){ //max에 도달했다면
            findFunding.addFundingCount();
            couponService.createCoupon(findFunding); //유저들에게 쿠폰발송
            return true;
        }
        return false;
    }


    //펀딩기간을 넘겼으면 min체크
    @Transactional
    @Scheduled(cron = "0 0 0 * * *") // 매일 0시에 체크
    public void checkFundingDate(){
        //현재 진행중인 펀딩리스트들 가져옴
        List<Funding> proceedingFunding = fundingRepository.findProceedingFunding();

        for (Funding funding : proceedingFunding) {
            if(funding.checkFundingDate() == true) { //기간이 지났다면
                if (funding.checkMinFunding() == true) { //min을 넘겼다면
                    couponService.createCoupon(funding);
                } else { //min을 못넘겼다면 , 유저에게 환불해줘야함

                }
            }
        }

    }


}
