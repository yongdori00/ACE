package TeamAce.AceProject.service;

import TeamAce.AceProject.domain.Subscription;
import TeamAce.AceProject.domain.User;
import TeamAce.AceProject.repository.SubscriptionRepository;
import TeamAce.AceProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static TeamAce.AceProject.domain.Subscription.createSubscription;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    //결제를 할시  user의 roleType -> subscriber로 변경
    public void subscribe(Long userId){
        User findUser = userRepository.findById(userId).get();
        Subscription subscription = createSubscription();
        findUser.setMySubscription(subscription);
        findUser.updateRoleType();
        subscriptionRepository.save(subscription);

    }

    //자동결제 안될시 user의 roleType -> normal로 변경
    @Scheduled(cron = "0 0 0 * * *") // 매일 0시에 체크
    public void subscriptionCancel(Long userId){
        User findUser = userRepository.findById(userId).get();
        findUser.updateRoleType();
    }



}
