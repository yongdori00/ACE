package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.Board;
import TeamAce.AceProject.domain.RoleType;
import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.dto.BoardDto;
import TeamAce.AceProject.repository.BoardRepository;
import TeamAce.AceProject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.jdo.annotations.Transactional;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;
@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class BoardServiceTest {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private BoardService boardService;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void createBoardTest() throws InterruptedException {
        User user = User.builder()
                .name("시균")
                .loginId("1234")
                .password("123")
                .email("qwe@123")
                .roleType(RoleType.ASSOCIATE)
                .build();

        BoardDto boardDto = BoardDto.builder()
                .title("테스트")
                .writer("시균")
                .content("테스트중입니다zzzzzzzzzzzzzzzzzzz")
                .build();


        User save = userRepository.save(user);
        Long boardId = boardService.saveBoard(save.getId(), boardDto);
        BoardDto updateBoardDto = BoardDto.builder()
                .id(boardId)
                .title("업데이트테스트")
                .writer("시균")
                .content("업데이트테스트중입니다zzzzzzzzzzzzzzzzzzz")
                .build();

        TimeUnit.SECONDS.sleep(3);
        boardService.updateBoard(updateBoardDto);
        BoardDto board = boardService.getBoard(boardId);
        System.out.println("board.getTitle() = " + board.getTitle());
        System.out.println("board.getWriter() = " + board.getWriter());
        System.out.println("board.getContent() = " + board.getContent());

        boardService.deletePost(boardId);

    }
}