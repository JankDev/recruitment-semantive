package com.semantive.shoppingcart.order;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface OrderItemRepository extends ReactiveCrudRepository<OrderItem,Integer> {
    Flux<OrderItem> findAllByOrderId(int orderId);
}
