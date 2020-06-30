package com.semantive.shoppingcart.order.dtos;

import com.semantive.shoppingcart.order.OrderItem;
import com.semantive.shoppingcart.user.User;
import lombok.Value;

import java.util.List;

@Value
public class NewOrderDTO {
    User user;
    List<OrderItem> items;
}
