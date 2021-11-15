package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.Board;
import TeamAce.AceProject.dto.BoardDto;
import TeamAce.AceProject.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    //게시글 작성
    @Transactional
    public Long saveBoard(BoardDto boardDto){
        return boardRepository.save(boardDto.toEntity()).getId();
    }

    //게시글 보여주기
    //Repository에서 모든 데이터를 조회하여, BoardDTO List에 데이터를 넣어 반환
    @Transactional
    public List<BoardDto> getBoardList() {
        List<Board> boardList = boardRepository.findAll();
        List<BoardDto> boardDtoList = new ArrayList<>();

        for(Board board : boardList) {
            BoardDto boardDTO = BoardDto.builder()
                    .id(board.getId())
                    .writer(board.getWriter())
                    .title(board.getTitle())
                    .content(board.getContent())
                    .build();
            boardDtoList.add(boardDTO);
        }

        return boardDtoList;
    }

    //게시글의 id를 받아 해당 게시글의 데이터만 가져와 화면에 뿌려줘야함.
    @Transactional
    public BoardDto getBoard(Long id) {
        Board board = boardRepository.findById(id).get();

        BoardDto boardDto = BoardDto.builder()
                .id(board.getId())
                .writer(board.getWriter())
                .title(board.getTitle())
                .content(board.getContent())
                .build();
        return boardDto;
    }

    //게시글 수정
    @Transactional
    public BoardDto updateBoard(Long id , BoardDto boardDto){
        Board board = boardRepository.findById(id).get();
        board.updateBoard(boardDto);
        Board updatedBoard = boardRepository.save(board);
        BoardDto updatedBoardDto = updatedBoard.toDto();

        return updatedBoardDto;

    }


    //글을 조회하는 페이지에서 ‘삭제’ 버튼을 누르면, /post/{id}으로 Delete 요청을 한다.
    // (만약 1번 글에서 ‘삭제’ 버튼을 클릭하면 /post/1로 접속.)
    @Transactional
    public void deletePost(Long id) {
        boardRepository.deleteById(id);
    }

}
