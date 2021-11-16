package TeamAce.AceProject.web.login;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository memberRepository;

    public User login(String loginId , String password){
        System.out.println("loginId111 = " + loginId);
        return memberRepository.findByLoginId(loginId)
                .filter(m -> m.getPassword().equals(password))
                .orElse(null);
    }

}
