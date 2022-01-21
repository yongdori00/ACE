package TeamAce.AceProject.controller;

import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.dto.BoardDto;
import TeamAce.AceProject.service.BoardService;
import TeamAce.AceProject.web.SessionConst;
import TeamAce.AceProject.web.argumentresolver.Login;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    //모든게시글보여주기
    @GetMapping("/boards")
    public List<BoardDto> getBoardList(){
        return boardService.getBoardList();
    }

    //게시글하나 상세보여주기
    @GetMapping("/board/{boardId}")
    public BoardDto getBoardInformation(@PathVariable Long boardId){
        return boardService.getBoard(boardId);
    }

    //공지사항쓰기
    @PostMapping("/board/create")
    public void write(@Login User loginUser,
                      @RequestBody BoardDto boardDto){
        boardService.saveBoard(loginUser.getId(), boardDto);
    }

    //공지사항수정
    @PostMapping("/board/update")
    public BoardDto modify(@RequestBody BoardDto boardDto){
        return boardService.updateBoard(boardDto);
    }

    //공지사항삭제
    @PostMapping("/board/delete/{boardId}")
    public void delete(@PathVariable Long boardId){
        boardService.deletePost(boardId);
    }
}
