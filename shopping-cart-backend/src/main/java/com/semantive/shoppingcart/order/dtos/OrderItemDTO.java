package com.semantive.shoppingcart.order.dtos;

import com.semantive.shoppingcart.product.Product;
import lombok.Value;

@Value
public class OrderItemDTO {
    int orderId;
    Product product;
    int amount;
}
