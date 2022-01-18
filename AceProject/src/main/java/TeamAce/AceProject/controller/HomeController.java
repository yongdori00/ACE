package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.web.SessionConst;
import TeamAce.AceProject.web.argumentresolver.Login;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

@RestController
public class HomeController {

    //로그인정보 + 펀딩리스트??
    @GetMapping("/")
    public String home(
            @Login User loginUser
    ){
        if(loginUser == null){
            return "false";
        }

        return "true";
    }
}
