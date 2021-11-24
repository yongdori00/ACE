package TeamAce.AceProject.domain;

import TeamAce.AceProject.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.management.relation.Role;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class User {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String name;
    private String loginId;
    private String password;
    private String email;
    private String authenticationKey;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToMany(mappedBy = "user")
    private List<Coupon> coupons = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id")
    private Subscription mySubscription;

    @OneToMany(mappedBy = "user")
    private List<UserFunding> userFundings = new ArrayList<>();

    @Builder
    public User(Long id, String name, String loginId, String password, String email, RoleType roleType) {
        this.id = id;
        this.name = name;
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.roleType = roleType;
    }

    protected User() {
    }

    public UserDto toDto(User user) {
        UserDto userDto = UserDto.builder()
                .name(user.getName())
                .loginId(user.getLoginId())
                .password(user.getPassword())
                .roleType(user.getRoleType())
                .email(user.getEmail())
                .build();

        return userDto;
    }

    //==연관관계 편의 메소드==//
    public void addUserFunding(UserFunding userFunding) {
        this.userFundings.add(userFunding);
        userFunding.setUser(this);
    }

    public void addCoupon(Coupon coupon) {
        this.coupons.add(coupon);
        coupon.setUser(this);
    }

    public void setSubscription(Subscription subscription) {
        this.mySubscription = subscription;
        subscription.setSubscriber(this);

    }

    //==비즈니스 로직==//

    //유저의 구독상태에 따른 roleType udpate
    //가입을 하고 이메일 인증을하면 준회원 -> 정회원
    public void updateRoleTypeForJoin() {
        this.roleType = RoleType.REGULAR;
    }

    //구독결제를 하면 roleType udpate
    //구독결제를 취소하면 roleType update
    public void updateRoleTypeForPayment(){
        if(this.roleType == RoleType.REGULAR)
            this.roleType = RoleType.SUBSCRIBER;
        else if(this.roleType == RoleType.SUBSCRIBER)
            this.roleType = RoleType.REGULAR;
    }
}
