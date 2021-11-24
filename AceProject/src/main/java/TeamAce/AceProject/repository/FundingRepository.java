package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Funding;
import TeamAce.AceProject.domain.User;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.Optional;

public interface FundingRepository extends JpaRepository<Funding, Long>,FundingRepositoryCustom {

        public Optional<Funding> findByRestaurantNameAndMenu(String restaurantName , String menu);

}
