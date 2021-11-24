package TeamAce.AceProject.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class FindPasswordDto {

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "아이디를 입력해주세요.")
    private String loginId;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 주소를 입력해주세요.")
    private String email;
}
