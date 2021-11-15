package TeamAce.AceProject.domain;

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
    public User(Long id, String name , String loginId , String password , String email , RoleType roleType){
        this.id = id;
        this.name = name;
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.roleType = roleType;
    }


    //==연관관계 편의 메소드==//
    public void addUserFunding(UserFunding userFunding){
        this.userFundings.add(userFunding);
        userFunding.setUser(this);
    }

    public void addCoupon(Coupon coupon){
        this.coupons.add(coupon);
        coupon.setUser(this);
    }

    public void setSubscription(Subscription subscription){
        this.mySubscription = subscription;
        subscription.setSubscriber(this);

    }

    //==비즈니스 로직==//

    //유저의 구독상태에 따른 roleType udpate
    public void updateRoleType(){
        if(this.roleType == RoleType.NORMAL)
            this.roleType = RoleType.SUBSCRIBER;
        else
            this.roleType = RoleType.NORMAL;
    }


}
