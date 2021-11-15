package TeamAce.AceProject.web.login;


import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.web.SessionConst;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    //로그인
    @GetMapping("/login")
    public String loginForm(@ModelAttribute LoginForm form){
        return "";
    }

    @PostMapping("/login")
    public String login(@Valid @ModelAttribute LoginForm form,
                        BindingResult bindingResult,
                        @RequestParam(value = "redirectURL" , required = false) String redirectUrl,
                        HttpServletRequest request){
        if(bindingResult.hasErrors())
            return "//*";

        User loginUser = loginService.login(form.getLoginId(), form.getPassword());

        if(loginUser == null){
            bindingResult.reject("loginFail" , "아이디 또는 비밀번호가 맞지 않습니다.");
            return "//*";
        }

        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER , loginUser);
        if(redirectUrl==null)
            return "redirect:/";
        else
            return "redirect:"+redirectUrl;
    }


    //로그아웃
    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return "redirect:/";
    }

}
