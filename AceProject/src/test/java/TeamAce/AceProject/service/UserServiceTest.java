package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.RoleType;
import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.repository.UserRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.jdo.annotations.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void joinUser(){
        User user = User.builder()
                .id(1L)
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.REGULAR)
                .build();


        User saveUser = userRepository.save(user);
        assertThat(saveUser.getId()).isEqualTo(user.getId());
        assertThat(saveUser).isEqualTo(user);
        saveUser.updateRoleTypeForJoin();
        assertThat(saveUser.getRoleType()).isNotEqualTo(user.getRoleType());
    }

    //아이디중복테스트

    //회원중복테스트
}