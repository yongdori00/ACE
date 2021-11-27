package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.*;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.repository.FundingRepository;
import TeamAce.AceProject.repository.UserFundingRepository;
import TeamAce.AceProject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.jdo.annotations.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class FundingServiceTest {

    @Autowired
    private FundingService fundingService;

    @Autowired
    private FundingRepository fundingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserFundingRepository userFundingRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void createFundingTest(){
        FundingDto fundingDto = FundingDto.builder()
                .restaurantName("멘동")
                .menu("가츠동")
                .information("여기는 멘동 wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
                .introduction("고민사거리")
                .notice("현금만받아요")
                .minFundingCount(15)
                .maxFundingCount(50)
                .nowFundingCount(0)
                .price(10000)
                .discountPrice(9000)
                .startDate(LocalDateTime.now())
                .build();

        fundingService.createFunding(fundingDto);
        Funding funding = fundingRepository.findByRestaurantNameAndMenu("멘동", "가츠동").get();
        assertThat(funding.getMinFundingCount()).isEqualTo(15);
        assertThat(funding.getRestaurantName()).isEqualTo("멘동");
    }

    @Test
    @Transactional
    @Rollback(false)
    public void joinFundingTest(){
        Funding funding = Funding.builder()
                .restaurantName("멘동")
                .price(10000)
                .discountPrice(9000)
                .menu("우동")
                .minFundingCount(1)
                .maxFundingCount(2)
                .nowFundingCount(0)
                .fundingStatus(FundingStatus.PROCEEDING)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now())
                .build();

        User user = User.builder()
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .build();

        User user2 = User.builder()
                .name("현구")
                .loginId("4321")
                .password("321")
                .email("asd@321")
                .roleType(RoleType.ASSOCIATE)
                .build();


        User saveUser = userRepository.save(user);
        User saveUser2 = userRepository.save(user2);
        Funding saveFunding = fundingRepository.save(funding);

        //펀딩에 유저펀딩이 잘들어가는지
        fundingService.addUserFunding(saveUser.getId() , saveFunding.getId());
        //유저가 펀딩에 참여할때 nowfundingCount가 잘 늘어나는지
        fundingService.addNowFundingCount(saveFunding.getId());
        Funding funding1 = fundingRepository.findById(saveFunding.getId()).get();

        assertThat(funding1.getNowFundingCount()).isEqualTo(1);

        //유저가 참여했을때 max에 도달했다면 -> 펀딩을 close , success로 상태를 바꿈
        assertThat(fundingService.checkMaxFundingCount(saveFunding.getId())).isEqualTo(true);

        fundingService.addUserFunding(saveUser2.getId() , saveFunding.getId());
        fundingService.addNowFundingCount(saveFunding.getId());
        Funding funding2 = fundingRepository.findById(saveFunding.getId()).get();

        assertThat(funding2.getNowFundingCount()).isEqualTo(2);

        /*
        User user3 = User.builder()
                .name("경호")
                .loginId("567")
                .password("765")
                .email("zxc@321")
                .roleType(RoleType.ASSOCIATE)
                .build();
        User saveUser3 = userRepository.save(user3);
         */


    }

}