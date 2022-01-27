package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {
}
