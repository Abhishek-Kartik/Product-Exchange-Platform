package com.abhishek.product_exchange.history;

import com.abhishek.product_exchange.common.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProductTransactionHistory extends BaseEntity {

    private boolean returned;
    private boolean returnApproved;


}
