package TeamAce.AceProject.controller;

import TeamAce.AceProject.dto.FundingDto;
import TeamAce.AceProject.service.FundingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;

@RestController
@RequiredArgsConstructor
public class FundingController {

    private final FundingService fundingService;

    //펀딩리스트들 제공
    @GetMapping("/RestList")
    public Slice<FundingDto> viewFundingList(){
        Pageable pageable = (Pageable) PageRequest.of(0,5);
        return fundingService.getFundingList(pageable);
    }

    //펀딩페이지
    @GetMapping("/RestList/RestInformation")
    public FundingDto viewFundingInformation(@RequestBody Long id){
        return fundingService.getFunding(id);
    }

    //펀딩참여하기


}
