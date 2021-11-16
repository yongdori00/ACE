package TeamAce.AceProject.domain;

import TeamAce.AceProject.dto.FundingDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Funding {

    @Id @GeneratedValue
    @Column(name = "funding_id")
    private Long id;

    private int minFundingCount;
    private int maxFundingCount;
    private int nowFundingCount;
    private int price;
    private int discountPrice;
    private String menu;
    private String restaurantName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "funding")
    private List<UserFunding> userFundings = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private FundingStatus fundingStatus; // 진행중 or 마감

    @Enumerated(EnumType.STRING)
    private IsFundingSuccess isFundingSuccess; // 기간안에 달성 or 실패


    @Builder
    public Funding(Long id , String restaurantName , String menu , int discountPrice , int price, int minFundingCount, int maxFundingCount, int nowFundingCount,
                   LocalDateTime startDate ,  LocalDateTime endDate , FundingStatus fundingStatus){
        this.id = id;
        this.restaurantName = restaurantName;
        this.menu = menu;
        this.price = price;
        this.discountPrice = discountPrice;
        this.minFundingCount = minFundingCount;
        this.maxFundingCount = maxFundingCount;
        this.nowFundingCount = 0;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fundingStatus = fundingStatus;

    }

    public FundingDto toDto(Funding funding){
        FundingDto fundingDto = FundingDto.builder()
                .id(funding.getId())
                .price(funding.getPrice())
                .discountPrice(funding.getDiscountPrice())
                .minFundingCount(funding.getMinFundingCount())
                .maxFundingCount(funding.getMaxFundingCount())
                .nowFundingCount(funding.getNowFundingCount())
                .startDate(funding.getStartDate())
                .endDate(funding.getEndDate())
                .build();

        return fundingDto;
    }


    //==연관관계 편의 메소드==//
    public void addUserFunding(UserFunding userFunding){
        this.userFundings.add(userFunding);
        userFunding.setFunding(this);
    }

    public void setRestaurant(Restaurant restaurant){
        this.restaurant = restaurant;
        restaurant.setFunding(this);
    }


    //==생성 메서드==// -> 연관관계 맺어주기
    public static Funding createFunding(FundingDto fundingDto , Restaurant restaurant ,UserFunding...userFundings){

        Funding funding = fundingDto.toEntity();
        funding.setRestaurant(restaurant);
        for (UserFunding userFunding : userFundings) {
            funding.addUserFunding(userFunding);
        }
        return funding;

    }


   //==비즈니스 로직==//

    //한 사람이 더 신청할때 쿠폰갯수추가
    public void addFundingCount(){
        if(this.nowFundingCount < this.maxFundingCount){
            this.nowFundingCount++;
        }
    }

    //펀딩신청수를 체크해서 max에 도달했는지 체크
    public boolean checkMaxFunding(){
        if(this.nowFundingCount+1 == this.maxFundingCount){
            this.fundingStatus = FundingStatus.CLOSE;
            this.isFundingSuccess = IsFundingSuccess.SUCCESS;

            //max에 도달 ,유저에게 쿠폰쏴주기
            return true;
        }
        //max에 도달X
        return false;
    }

    //기간이 지났는지 체크
    public boolean checkFundingDate(){
        if(this.endDate.isAfter(LocalDateTime.now())){
            return true;
        }
        return false;
    }

    //기간이 지났으면 min을 넘겼는지 체크
    public boolean checkMinFunding(){
        if(this.nowFundingCount >= this.minFundingCount){
            this.fundingStatus = FundingStatus.CLOSE;
            this.isFundingSuccess = IsFundingSuccess.SUCCESS;

            return true;

        }else{ //min못넘겼으면 펀딩실패
            this.fundingStatus = FundingStatus.CLOSE;
            this.isFundingSuccess = IsFundingSuccess.FAIL;

            return false;
        }
    }


    //펀딩정보를 바탕으로 쿠폰만들어준다.
    public Coupon FundingToCoupon(Funding funding){
        Coupon coupon = Coupon.builder()
                .restaurantName(funding.getRestaurantName())
                .menu(funding.getMenu())
                .discountPrice(funding.getDiscountPrice())
                .startDate(funding.getStartDate()) // 수정 -> 펀딩날짜랑 쿠폰기한이랑은 다름
                .endDate(funding.getEndDate())  // 수정 -> 펀딩날짜랑 쿠폰기한이랑은 다름
                .couponStatus(CouponStatus.AVAILABLE)
                .build();

        return coupon;
    }



}
