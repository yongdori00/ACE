package TeamAce.AceProject.repository;

import TeamAce.AceProject.domain.Funding;
import TeamAce.AceProject.domain.FundingStatus;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static TeamAce.AceProject.domain.QFunding.*;


@RequiredArgsConstructor
public class FundingRepositoryImpl implements FundingRepositoryCustom{

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<Funding> findAllCustom(Pageable pageable) {
        QueryResults<Funding> result = queryFactory
                .selectFrom(funding)
                .where(funding.fundingStatus.eq(FundingStatus.PROCEEDING))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetchResults();

        List<Funding> content = new ArrayList<>();
        for (Funding eachFunding : result.getResults()) {
            content.add(eachFunding);
        }

        boolean hasNext = false;
        if (content.size() > pageable.getPageSize()) {
            content.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(content, pageable, hasNext);
    }

    @Override
    public List<Funding> findProceedingFunding(){
        return queryFactory
                .selectFrom(funding)
                .where(funding.fundingStatus.eq(FundingStatus.PROCEEDING))
                .fetch();

    }
}
