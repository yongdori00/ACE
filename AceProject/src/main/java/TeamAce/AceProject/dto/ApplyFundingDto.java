package TeamAce.AceProject.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApplyFundingDto {

    private Long userId;
    private Long fundingId;

    @Builder
    public ApplyFundingDto(Long userId, Long fundingId){
        this.fundingId = fundingId;
        this.userId = userId;
    }
}
