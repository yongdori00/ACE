package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.web.SessionConst;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String home(
            @SessionAttribute(name = SessionConst.LOGIN_MEMBER,required = false) User loginUser
            , Model model
    ){
        if(loginUser == null){
            return "//로그인안했을때화면";
        }

        model.addAttribute("member" , loginUser);
        return "//로그인했을때의 화면";
    }
}
