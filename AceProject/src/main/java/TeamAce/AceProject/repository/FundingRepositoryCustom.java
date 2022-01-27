package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Funding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface FundingRepositoryCustom {
    Slice<Funding> findAllCustom(Pageable pageable);
    List<Funding> findProceedingFunding();
    List<Funding> findReadyFunding();
}
