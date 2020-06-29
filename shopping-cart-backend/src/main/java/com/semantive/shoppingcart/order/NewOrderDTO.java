package com.semantive.shoppingcart.order;

import com.semantive.shoppingcart.user.User;
import lombok.Value;

import java.util.List;

@Value
public class NewOrderDTO {
    User user;
    List<OrderItem> items;
}
