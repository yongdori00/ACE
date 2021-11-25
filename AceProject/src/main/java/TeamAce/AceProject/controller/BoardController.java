package TeamAce.AceProject.controller;

import TeamAce.AceProject.dto.BoardDto;
import TeamAce.AceProject.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    //모든게시글보여주기
    //@GetMapping
    public List<BoardDto> getBoardList(){
        return boardService.getBoardList();
    }

    //게시글하나 상세보여주기
    //@GetMapping
    public BoardDto getBoardInformation(@RequestBody Long boardId){
        return boardService.getBoard(boardId);
    }

    //공지사항쓰기
    //@PostMapping
    public void write(@RequestBody BoardDto boardDto){
        boardService.saveBoard(boardDto);
    }

    //공지사항수정
    //@PostMapping
    public BoardDto modify(@RequestBody BoardDto boardDto){
        return boardService.updateBoard(boardDto);
    }

    //공지사항삭제
    //@PostMapping
    public void delete(@RequestBody Long boardId){
        boardService.deletePost(boardId);
    }
}
