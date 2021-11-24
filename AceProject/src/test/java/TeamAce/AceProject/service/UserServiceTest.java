package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.RoleType;
import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.jdo.annotations.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
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
                .roleType(RoleType.ASSOCIATE)
                .build();

        System.out.println("user = " + user.getName());
        userRepository.save(user);
        System.out.println(" 123 " );
        User saveUser = userRepository.findByName(user.getName()).get();
        assertThat(saveUser.getId()).isEqualTo(user.getId());
        System.out.println("saveUser.getRoleType() = " + saveUser.getRoleType());
        saveUser.updateRoleTypeForJoin();
        System.out.println("saveUser.getRoleType() = " + saveUser.getRoleType());
        assertThat(saveUser.getRoleType()).isNotEqualTo(user.getRoleType());
    }

    //아이디중복테스트

    //회원중복테스트
}