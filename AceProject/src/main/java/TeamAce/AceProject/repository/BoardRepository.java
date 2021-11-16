package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board,Long> {

}
