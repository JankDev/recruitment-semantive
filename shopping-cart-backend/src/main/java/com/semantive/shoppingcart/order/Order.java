package com.semantive.shoppingcart.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("orders")
public class Order {
    @Id
    @With
    private Integer id;
    @Column("user_id")
    private Integer userId;
    @Column("created_date")
    private LocalDateTime createdDate;

    public Order(Integer userId, LocalDateTime createdDate) {
        this.userId = userId;
        this.createdDate = createdDate;
    }
}
