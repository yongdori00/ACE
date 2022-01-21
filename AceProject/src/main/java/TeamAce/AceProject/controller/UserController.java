package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.dto.*;
import TeamAce.AceProject.service.UserService;
import TeamAce.AceProject.web.SessionConst;
import TeamAce.AceProject.web.argumentresolver.Login;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //아이디 중복체크
    @GetMapping("/join/id")
    public ResponseEntity<Boolean> checkLoginIdDuplicate(@PathVariable String loginId) {
        //true -> 아이디중복 , false -> 아이디중복 없음
        return ResponseEntity.ok(userService.checkLoginIdDuplicate(loginId));
    }

    //내정보
    //@GetMapping
    public UserDto viewMyPage(
            @Login User loginUser
    ) {
        return userService.getUserInformation(loginUser.getId());
    }

    //내정보 속 쿠폰함
    //@GetMapping
    public List<CouponDto> viewMyCouponList(
            @Login User loginUser
    ){
        return userService.getCouponList(loginUser.getId());
    }

    //회원가입
    @PostMapping("/join")
    public void createUser(@Valid @RequestBody UserDto userDto , BindingResult result) throws Exception {
        log.info("UserController : createUser");
        if(result.hasErrors()){
            //오류가있으면
        }
        userService.join(userDto);
    }

    //아이디 찾기 , 아이디를 return
    @GetMapping("/find/id")
    public String findLoginId(@RequestBody FindLoginIdDto findLoginIdDto){
        return userService.findLoginId(findLoginIdDto);
    }

    //비밀번호 찾기 , 비밀번호를 return
    @GetMapping("/find/password")
    public String findPassword(@RequestBody FindPasswordDto findPasswordDto){
        return userService.findPassword(findPasswordDto);
    }

    //이메일인증
    @PostMapping("/join/mail")
    public void authenticationEmail(
            @Login User loginUser,
            @RequestBody AuthenticationKeyDto authenticationKeyDto
    ){
        log.info("UserController : authenticationEmail");
        log.info("loginUser : {} " , loginUser.getLoginId() );
        log.info("authenticationKey : {}" ,authenticationKeyDto );
        userService.IsEqualAuthenticationKey(loginUser.getId(), authenticationKeyDto.getAuthenticationKey());
    }

}

