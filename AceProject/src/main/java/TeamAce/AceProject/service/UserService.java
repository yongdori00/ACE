package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.*;
import TeamAce.AceProject.dto.CouponDto;
import TeamAce.AceProject.dto.UserDto;
import TeamAce.AceProject.repository.CouponRepository;
import TeamAce.AceProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //회원가입
    @Transactional
    public Long join(UserDto userDto){

        validateDuplicateUser(userDto);
        User user = userDto.toEntity();
        user.setRoleType(RoleType.NORMAL);
        userRepository.save(user);
        return user.getId();
    }


    //아이디 중복체크
    public boolean checkLoginIdDuplicate(String loginId) {
        //true -> 아이디중복 , false -> 아이디중복 없음
        return userRepository.existsByLoginId(loginId);
    }

    //회원중복체크 -> 이름+이메일
    public void validateDuplicateUser(UserDto userDto){
        Optional<User> findUser = userRepository.findByNameAndEmail(userDto.getName(), userDto.getEmail());
        if(findUser.isPresent()){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    //자기가 가진 쿠폰들
    public List<CouponDto> getCouponList(Long id){
        Optional<User> findUser = userRepository.findById(id);
        List<Coupon> coupons = findUser.get().getCoupons();
        List<CouponDto> couponDtoList = new ArrayList<>();

        for (Coupon coupon : coupons) {
            CouponDto couponDto = CouponDto.builder()
                    .restaurantName(coupon.getRestaurantName())
                    .menu(coupon.getMenu())
                    .discountPrice(coupon.getDiscountPrice())
                    .startDate(coupon.getStartDate())
                    .endDate(coupon.getEndDate())
                    .build();

            couponDtoList.add(couponDto);
        }
        return couponDtoList;
    }

    //펀딩중복참여 체크
    public void validateDuplicateFunding(Long id , Funding funding){
        Optional<User> findUser = userRepository.findById(id);
        User user = findUser.get();
        List<UserFunding> userFundings = user.getUserFundings();

        for (UserFunding userFunding : userFundings) {
            if(userFunding.getId() == funding.getId()){ //내가 참여할려고한 펀딩이 이미 참여해있는 펀딩이라면
                throw new IllegalStateException("이미 참여한 펀딩입니다.");
            }
        }

    }

}
