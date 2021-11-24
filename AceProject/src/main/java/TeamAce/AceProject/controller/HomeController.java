package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.web.SessionConst;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

@RestController
public class HomeController {
    @RequestMapping("/url")
    public String home(
            @SessionAttribute(name = SessionConst.LOGIN_MEMBER,required = false) User loginUser
    ){
        if(loginUser == null){
            return "//로그인안했을때화면";
        }

        return "//로그인했을때의 화면";
    }
}
