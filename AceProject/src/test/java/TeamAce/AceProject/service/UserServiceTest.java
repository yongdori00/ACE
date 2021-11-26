package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.*;
import TeamAce.AceProject.dto.CouponDto;
import TeamAce.AceProject.dto.FindLoginIdDto;
import TeamAce.AceProject.dto.FindPasswordDto;
import TeamAce.AceProject.dto.UserDto;
import TeamAce.AceProject.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.jdo.annotations.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserFundingRepository userFundingRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void joinUser(){
        User user = User.builder()
                .id(1L)
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .build();

        System.out.println("user = " + user.getName());
        userRepository.save(user);
        System.out.println(" 123 " );
        User saveUser = userRepository.findByName(user.getName()).get();
        assertThat(saveUser.getId()).isEqualTo(user.getId());
        System.out.println("saveUser.getRoleType() = " + saveUser.getRoleType());
        saveUser.updateRoleTypeForJoin();
        System.out.println("saveUser.getRoleType() = " + saveUser.getRoleType());
        assertThat(saveUser.getRoleType()).isNotEqualTo(user.getRoleType());
    }

    //아이디중복테스트
    //회원중복테스트
    @Test
    @Transactional
    @Rollback(false)
    public void loginIdTest(){
        User user = User.builder()
                .id(2L)
                .name("세균")
                .loginId("12")
                .password("234")
                .email("qwe@12345")
                .roleType(RoleType.ASSOCIATE)
                .build();

        userRepository.save(user);
        User user2 = User.builder()
                .id(3L)
                .name("세균")
                .loginId("12")
                .password("234")
                .email("qwe@12345")
                .roleType(RoleType.ASSOCIATE)
                .build();
        UserDto userDto = user2.toDto(user2);

        //아이디중복테스트
        assertThat(true).isEqualTo(userService.checkLoginIdDuplicate(user2.getLoginId()));

        //회원중복테스트
        assertThrows(IllegalStateException.class,() -> {userService.validateDuplicateUser(userDto); });
    }

    //자기 쿠폰함 리스트
    @Test
    @Transactional
    @Rollback(false)
    public void myCouponListTest() {
        User user = User.builder()
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .build();

        Coupon cp1 = Coupon.builder()
                .restaurantName("멘동")
                .menu("가츠동")
                .discountPrice(10000)
                .couponStatus(CouponStatus.AVAILABLE)
                .build();

        Coupon cp2 = Coupon.builder()
                .restaurantName("만나")
                .menu("돈까스")
                .discountPrice(20000)
                .couponStatus(CouponStatus.AVAILABLE)
                .build();

        user.addCoupon(cp1);
        user.addCoupon(cp2);

        User save = userRepository.save(user);

        List<CouponDto> couponList = userService.getCouponList(save.getId());

        assertThat(couponList.size()).isEqualTo(2);
        for (CouponDto couponDto : couponList) {
            System.out.println("couponDto = " + couponDto.getRestaurantName());
            System.out.println("couponDto.getMenu() = " + couponDto.getMenu());
            System.out.println("couponDto.getCouponStatus() = " + couponDto.getCouponStatus());
            System.out.println("couponDto.getDiscountPrice() = " + couponDto.getDiscountPrice());
        }
    }

    //펀딩 중복 참여 체크
    @Test
    @Transactional
    @Rollback(false)
    public void fundingOverlapTest(){
        User user = User.builder()
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .build();

        Funding funding = Funding.builder()
                .restaurantName("멘동")
                .price(10000)
                .discountPrice(9000)
                .menu("우동")
                .minFundingCount(15)
                .maxFundingCount(50)
                .nowFundingCount(0)
                .fundingStatus(FundingStatus.PROCEEDING)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now())
                .isFundingSuccess(IsFundingSuccess.SUCCESS)
                .build();

        Restaurant restaurant = Restaurant.builder()
                .restaurantName("멘동")
                .introduction("안녕하세요 멘동입니다 wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
                .information("서울시 관악구 행운동 wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
                .notice("공지사항입니다.")
                .build();

        UserFunding userFunding = UserFunding.builder()
                .funding(funding)
                .user(user)
                .build();

        funding.addUserFunding(userFunding);
        user.addUserFunding(userFunding);

        UserFunding save = userFundingRepository.save(userFunding);
        assertThrows(IllegalStateException.class , () -> {userService.validateDuplicateFunding(user.getId(),funding);  });
    }

    //이메일 인증
    @Test
    @Transactional
    @Rollback(false)
    public void emailAuthenticationKeyTest(){
        User user = User.builder()
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .authenticationKey("asd123")
                .build();

        User save = userRepository.save(user);
        userService.IsEqualAuthenticationKey(save.getId(), "asd123");
        User user1 = userRepository.findById(save.getId()).get();
        assertThat(user1.getRoleType()).isEqualTo(RoleType.REGULAR);

    }

    //아이디 찾기 , 비밀번호 찾기
    @Test
    @Transactional
    @Rollback(false)
    public void findLoginIdAndPasswordTest(){
        User user = User.builder()
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .authenticationKey("asd123")
                .build();

        User save = userRepository.save(user);

        FindLoginIdDto findLoginIdDto1 = FindLoginIdDto.builder()
                .name("시균")
                .email("qwe@123")
                .build();

        FindLoginIdDto findLoginIdDto2 = FindLoginIdDto.builder()
                .name("시균2")
                .email("qwe@123")
                .build();

        FindPasswordDto findPasswordDto1 = FindPasswordDto.builder()
                .name("시균")
                .email("qwe@123")
                .loginId("1234")
                .build();

        FindPasswordDto findPasswordDto2 = FindPasswordDto.builder()
                .name("시균")
                .email("qwe@123")
                .loginId("123")
                .build();

        assertThat(userService.findLoginId(findLoginIdDto1)).isEqualTo("1234");
        assertThrows(IllegalStateException.class , () -> { userService.findLoginId(findLoginIdDto2); } );

        assertThat(userService.findPassword(findPasswordDto1)).isEqualTo("123");
        assertThrows(IllegalStateException.class , () -> { userService.findPassword(findPasswordDto2); } );

    }

}