package com.abhishek.product_exchange.product;


import com.abhishek.product_exchange.common.BaseEntity;
import com.abhishek.product_exchange.feedback.Feedback;
import com.abhishek.product_exchange.history.ProductTransactionHistory;
import com.abhishek.product_exchange.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends BaseEntity {
    private String title;
    private String brand;
    private String productCode;

    @Column(length = 2000)
    private String description;
    private String imageUrl;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "product")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "product")
    private List<ProductTransactionHistory> histories;

    @Transient
    public double getRating(){
        if(feedbacks == null || feedbacks.isEmpty()){
            return 0.0;
        }
        var rating = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);
        return Math.round(rating *10.0) /10.0;
    }
}
