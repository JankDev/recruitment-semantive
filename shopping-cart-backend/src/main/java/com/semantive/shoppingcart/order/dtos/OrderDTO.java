package com.semantive.shoppingcart.order.dtos;

import com.semantive.shoppingcart.user.User;
import lombok.Value;

import java.time.LocalDateTime;

@Value
public class OrderDTO {
    int orderId;
    User user;
    LocalDateTime createdDate;
}
