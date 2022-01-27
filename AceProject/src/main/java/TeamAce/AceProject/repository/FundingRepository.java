package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Funding;
import TeamAce.AceProject.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FundingRepository extends JpaRepository<Funding, Long>,FundingRepositoryCustom {

        public Optional<Funding> findByRestaurantNameAndMenu(String restaurantName , String menu);
        public List<Funding> findByRestaurantNameContaining(String restaurantName);

        @Override
        Page<Funding> findAll(Pageable pageable);
}
