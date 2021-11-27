package TeamAce.AceProject.domain;

import TeamAce.AceProject.dto.BoardDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board extends TimeEntity{

    @Id
    @GeneratedValue
    @Column(name = "board_id")
    private Long id;

    private String writer; //글 작성자
    private String title;

    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Board(Long id ,  String title,String content , String writer){
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
    }

    public BoardDto toDto(){
        BoardDto build = BoardDto.builder()
                .id(this.id)
                .writer(this.writer)
                .title(this.title)
                .content(this.content)
                .build();
        return build;
    }


    //==비즈니스 로직==//
    public void updateBoard(BoardDto boardDto){
        this.writer = boardDto.getWriter();
        this.title = boardDto.getTitle();
        this.content = boardDto.getContent();
    }

}
