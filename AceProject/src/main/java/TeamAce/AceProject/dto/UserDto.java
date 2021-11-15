package TeamAce.AceProject.dto;

import TeamAce.AceProject.domain.RoleType;
import TeamAce.AceProject.domain.User;
import lombok.Builder;
import lombok.Getter;

import javax.management.relation.Role;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class UserDto {

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "아이디를 입력해주세요.")
    private String loginId;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 주소를 입력해주세요.")
    private String email;

    private RoleType roleType;

    //계좌추가


    public User toEntity(){
        User build = User.builder()
                .name(name)
                .loginId(loginId)
                .password(password)
                .email(email)
                .build();
        return build;
    }


    @Builder
    public UserDto(String name , String loginId, String password, String email  , RoleType roleType){
        this.name = name;
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.roleType = roleType;
    }

}
