package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.dto.ApplyFundingDto;
import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.dto.PageRequestDto;
import TeamAce.AceProject.service.FundingService;
import TeamAce.AceProject.web.argumentresolver.Login;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FundingController {

    private final FundingService fundingService;

    //펀딩리스트들 제공
    @GetMapping("/fundings")
    public Slice<FundingDto> viewFundingList(
            @RequestBody PageRequestDto pageRequestDto
            ){
        log.info("FundingController : viewFundingList");
        return fundingService.getFundingList(pageRequestDto);
    }

    //펀딩페이지
    @GetMapping("/funding/{fundingId}")
    public FundingDto viewFundingInformation(@PathVariable Long fundingId){
        log.info("FundingController : viewFundingInformation");
        return fundingService.getFunding(fundingId);
    }

    //펀딩참여하기
    @PostMapping("/funding/{fundingId}")
    public boolean applyFunding(
            @Login User loginUser,
            @PathVariable Long fundingId){
        log.info("FundingController : applyFunding");
        if(fundingService.isMaxFundingCount(fundingId)){ //이미 펀딩이 max라면
            return false;
        }else if(fundingService.checkMaxFundingCount(loginUser.getId() , fundingId)){ //이번 신청으로 max에 도달했다면

            return true;
        }else {
            fundingService.addUserFunding(loginUser.getId(),fundingId);
            fundingService.addNowFundingCount(fundingId);
            return true;
        }

    }

    //펀딩만들기
    @PostMapping("/funding/create")
    public boolean createFunding(
            @RequestBody FundingDto fundingDto
    ){
        log.info("FundingController : createFunding");
        fundingService.createFunding(fundingDto);
        return true;
    }

    //검색하기
    @GetMapping("/find/{restaurantName}")
    public List<FundingDto> findFundingList(
            @PathVariable String restaurantName
    ){
        log.info("FundingController : findFundingList");
        return fundingService.findFundingList(restaurantName);
    }
}
