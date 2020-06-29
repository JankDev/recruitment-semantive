package com.semantive.shoppingcart.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("order_items")
public class OrderItem {
    @Id
    private Integer id;
    @Column("order_id")
    @With
    private Integer orderId;
    @Column("product_id")
    private Integer productId;
    private int amount;

    public OrderItem(Integer productId, int amount) {
        this.productId = productId;
        this.amount = amount;
    }

    public OrderItem(Integer orderId, Integer productId, int amount) {
        this.orderId = orderId;
        this.productId = productId;
        this.amount = amount;
    }
}
