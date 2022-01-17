package TeamAce.AceProject.controller;

import TeamAce.AceProject.dto.ApplyFundingDto;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.service.FundingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequiredArgsConstructor
public class FundingController {

    private final FundingService fundingService;

    //펀딩리스트들 제공
    @GetMapping("/fundings")
    public Slice<FundingDto> viewFundingList(
        @RequestBody @PageableDefault(size = 2) Pageable pageable,
        @RequestBody String page
    ){
        int page2 = Integer.parseInt(page);
        Pageable pageable2 = PageRequest.of(page2, pageable.getPageSize());
        return fundingService.getFundingList(pageable2);
    }

    //펀딩페이지
    //@GetMapping("/funding/{id}")
    public FundingDto viewFundingInformation(@RequestBody Long fundingId){
        return fundingService.getFunding(fundingId);
    }

    //펀딩참여하기
    //@PostMapping("/funding/{id}")
    public void applyFunding(@RequestBody ApplyFundingDto applyFundingDto){

        if(fundingService.checkMaxFundingCount(applyFundingDto.getFundingId())){ //max에 도달했다면
            return;
        }
        fundingService.addUserFunding(applyFundingDto.getUserId(),applyFundingDto.getFundingId());
        fundingService.addNowFundingCount(applyFundingDto.getFundingId());
    }



}
