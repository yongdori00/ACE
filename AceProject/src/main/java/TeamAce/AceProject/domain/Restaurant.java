package TeamAce.AceProject.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Restaurant {

    @Id @GeneratedValue
    @Column(name = "restaurant_id")
    private Long id;

    private String restaurantName;

    @Lob
    private String introduction;

    @Lob
    private String information;

    @Lob
    private String notice;

    @OneToOne(mappedBy = "restaurant" , fetch = FetchType.LAZY)
    private Funding funding;




}
