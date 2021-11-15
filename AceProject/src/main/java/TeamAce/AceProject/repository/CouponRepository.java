package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon , Long> {
}
