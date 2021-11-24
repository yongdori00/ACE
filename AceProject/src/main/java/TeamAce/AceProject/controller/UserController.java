package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.dto.CouponDto;
import TeamAce.AceProject.dto.FindLoginIdDto;
import TeamAce.AceProject.dto.FindPasswordDto;
import TeamAce.AceProject.dto.UserDto;
import TeamAce.AceProject.service.UserService;
import TeamAce.AceProject.web.SessionConst;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //아이디 중복체크
    @GetMapping("")
    public ResponseEntity<Boolean> checkLoginIdDuplicate(@PathVariable String loginId) {
        //true -> 아이디중복 , false -> 아이디중복 없음
        return ResponseEntity.ok(userService.checkLoginIdDuplicate(loginId));
    }

    //내정보
    @GetMapping("/mypage")
    public UserDto viewMyPage(
            @SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) User loginUser
    ) {
        return userService.getUserInformation(loginUser.getId());
    }

    //내정보 속 쿠폰함
    @GetMapping()
    public List<CouponDto> viewMyCouponList(
            @SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) User loginUser
    ){
        return userService.getCouponList(loginUser.getId());
    }

    //회원가입
    @PostMapping
    public void createUser(@Valid @RequestBody UserDto userDto , BindingResult result) throws Exception {
        if(result.hasErrors()){
            //오류가있으면
        }
        userService.join(userDto);
    }

    //아이디 찾기
    @GetMapping
    public String findLoginId(@RequestBody FindLoginIdDto findLoginIdDto){
        return userService.findLoginId(findLoginIdDto);
    }

    //비밀번호 찾기
    @GetMapping
    public String findPassword(@RequestBody FindPasswordDto findPasswordDto){
        return userService.findPassword(findPasswordDto);
    }

    //이메일인증
    @PostMapping
    public void authenticationEmail(
            @SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) User loginUser,
            @RequestBody String authenticationKey
    ){
        userService.IsEqualAuthenticationKey(loginUser.getId(), authenticationKey);
    }

}

