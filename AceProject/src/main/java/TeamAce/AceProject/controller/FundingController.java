package TeamAce.AceProject.controller;

import TeamAce.AceProject.dto.ApplyFundingDto;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.dto.PageRequestDto;
import TeamAce.AceProject.service.FundingService;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequiredArgsConstructor
public class FundingController {

    private final FundingService fundingService;

    //펀딩리스트들 제공
    @GetMapping("/fundings")
    public Slice<FundingDto> viewFundingList(
            @RequestBody PageRequestDto pageRequestDto
            ){
        return fundingService.getFundingList(pageRequestDto);
    }

    //펀딩페이지
    @GetMapping("/funding/{fundingId}")
    public FundingDto viewFundingInformation(@RequestBody Long fundingId){
        return fundingService.getFunding(fundingId);
    }

    //펀딩참여하기
    @PostMapping("/funding/{fundingId}")
    public void applyFunding(@RequestBody ApplyFundingDto applyFundingDto){

        if(fundingService.checkMaxFundingCount(applyFundingDto.getFundingId())){ //max에 도달했다면
            return;
        }
        fundingService.addUserFunding(applyFundingDto.getUserId(),applyFundingDto.getFundingId());
        fundingService.addNowFundingCount(applyFundingDto.getFundingId());
    }

    //펀딩만들기

}
