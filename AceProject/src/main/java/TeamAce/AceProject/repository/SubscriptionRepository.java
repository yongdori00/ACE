package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription , Long> {
}
