package TeamAce.AceProject.web.login;


import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.web.SessionConst;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    //로그인
    //@GetMapping("/login")
    public String loginForm(@RequestBody LoginForm form){
        return "";
    }

    //로그인
    //@PostMapping("/login")
    public String login(@Valid @RequestBody LoginForm form,
                        BindingResult bindingResult,
                        HttpServletRequest request){
        if(bindingResult.hasErrors())
            return "//*";   //다시 로그인화면으로

        User loginUser = loginService.login(form.getLoginId(), form.getPassword());

        if(loginUser == null){
            bindingResult.reject("loginFail" , "아이디 또는 비밀번호가 맞지 않습니다.");
            return "//*";   //다시 로그인화면으로
        }

        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER , loginUser);

        return "로그인성공";
        /*
        //원래있던 화면으로 돌아갈수있게 해줌
        if(redirectUrl==null)
            return "redirect:/";
        else
            return "redirect:"+redirectUrl;

         */
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
