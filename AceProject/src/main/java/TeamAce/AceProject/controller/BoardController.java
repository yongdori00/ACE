package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.dto.BoardDto;
import TeamAce.AceProject.service.BoardService;
import TeamAce.AceProject.web.SessionConst;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    //모든게시글보여주기
    //@GetMapping("/boards")
    public List<BoardDto> getBoardList(){
        return boardService.getBoardList();
    }

    //게시글하나 상세보여주기
    //@GetMapping("/board/{id}")
    public BoardDto getBoardInformation(@RequestBody Long boardId){
        return boardService.getBoard(boardId);
    }

    //공지사항쓰기
    //@PostMapping("/board/{id}")
    public void write(@SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) User loginUser,
                      @RequestBody BoardDto boardDto){
        boardService.saveBoard(loginUser.getId(), boardDto);
    }

    //공지사항수정
    //@PatchMapping("/board/{id}")
    public BoardDto modify(@RequestBody BoardDto boardDto){
        return boardService.updateBoard(boardDto);
    }

    //공지사항삭제
    //@DeleteMapping("/board/{id}")
    public void delete(@RequestBody Long boardId){
        boardService.deletePost(boardId);
    }
}
