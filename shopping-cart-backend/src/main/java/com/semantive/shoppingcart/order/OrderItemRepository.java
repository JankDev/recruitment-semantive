package com.semantive.shoppingcart.order;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends ReactiveCrudRepository<OrderItem,Integer> {
}
