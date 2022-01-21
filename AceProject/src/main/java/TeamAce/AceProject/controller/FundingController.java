package TeamAce.AceProject.controller;

import TeamAce.AceProject.dto.ApplyFundingDto;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.dto.PageRequestDto;
import TeamAce.AceProject.service.FundingService;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;


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
    @GetMapping("/funding/{id}")
    public FundingDto viewFundingInformation(@PathVariable Long id){
        return fundingService.getFunding(id);
    }

    //펀딩참여하기
    @PostMapping("/funding/{id}")
    public void applyFunding(@RequestBody ApplyFundingDto applyFundingDto){

        if(fundingService.checkMaxFundingCount(applyFundingDto.getFundingId())){ //max에 도달했다면
            return;
        }
        fundingService.addUserFunding(applyFundingDto.getUserId(),applyFundingDto.getFundingId());
        fundingService.addNowFundingCount(applyFundingDto.getFundingId());
    }

    //펀딩 등록하기



}
