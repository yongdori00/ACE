package TeamAce.AceProject.dto;

import TeamAce.AceProject.domain.Funding;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.PrivateKey;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class FundingDto {

    private Long id;
    private String restaurantName;
    private String menu;
    private int discountPrice;
    private int price;
    private int minFundingCount;
    private int maxFundingCount;
    private int nowFundingCount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    //가게주인?
    public Funding toEntityFirst(){
        Funding build = Funding.builder()
                .restaurantName(restaurantName)
                .menu(menu)
                .price(price)
                .discountPrice(discountPrice)
                .maxFundingCount(maxFundingCount)
                .minFundingCount(minFundingCount)
                .nowFundingCount(0)
                .startDate(startDate)
                .endDate(endDate)
                .build();

        return build;
    }

    public Funding toEntity(){
        Funding build = Funding.builder()
                .id(id)
                .restaurantName(restaurantName)
                .menu(menu)
                .price(price)
                .discountPrice(discountPrice)
                .maxFundingCount(maxFundingCount)
                .minFundingCount(minFundingCount)
                .nowFundingCount(0)
                .startDate(startDate)
                .endDate(endDate)
                .build();

        return build;
    }

    @Builder
    public FundingDto( Long id, String restaurantName , String menu , int discountPrice , int price , int minFundingCount, int maxFundingCount,  int nowFundingCount ,
                      LocalDateTime startDate ,  LocalDateTime endDate){

        this.id = id;
        this.restaurantName = restaurantName;
        this.menu = menu;
        this.price =price;
        this.discountPrice = discountPrice;
        this.minFundingCount = minFundingCount;
        this.maxFundingCount = maxFundingCount;
        this.nowFundingCount = nowFundingCount;
        this.startDate = startDate;
        this.endDate = endDate;

    }
}
