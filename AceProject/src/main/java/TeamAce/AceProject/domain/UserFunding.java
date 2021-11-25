package TeamAce.AceProject.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserFunding {

    @Id @GeneratedValue
    @Column(name = "userFunding_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    @JoinColumn(name = "funding_id")
    private Funding funding;


    @Builder
    public UserFunding(User user , Funding funding){
        this.user = user;
        this.funding = funding;
    }


}
