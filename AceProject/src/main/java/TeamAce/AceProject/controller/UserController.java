package TeamAce.AceProject.controller;

import TeamAce.AceProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //아이디 중복체크
    @GetMapping("")
    public ResponseEntity<Boolean> checkLoginIdDuplicate(@PathVariable String loginId){
        //true -> 아이디중복 , false -> 아이디중복 없음
        return ResponseEntity.ok(userService.checkLoginIdDuplicate(loginId));

    }
}
