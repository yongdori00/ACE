package TeamAce.AceProject.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class UserFunding {

    @Id @GeneratedValue
    @Column(name = "userFunding_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funding_id")
    private Funding funding;


    @Builder
    public UserFunding(User user , Funding funding){
        this.user = user;
        this.funding = funding;
    }


}
