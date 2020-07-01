package com.semantive.shoppingcart.order;

import com.semantive.shoppingcart.order.dtos.NewOrderDTO;
import com.semantive.shoppingcart.order.dtos.OrderDTO;
import com.semantive.shoppingcart.order.dtos.OrderItemDTO;
import com.semantive.shoppingcart.product.ProductRepository;
import com.semantive.shoppingcart.user.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Clock;
import java.time.LocalDateTime;

@Component
public class OrderHandler {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private Clock clock;

    public OrderHandler(OrderRepository orderRepository, OrderItemRepository orderItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.clock = Clock.systemDefaultZone();
    }

    public void setClock(Clock clock) {
        this.clock = clock;
    }

    public Mono<ServerResponse> saveOrder(ServerRequest request) {
        return ServerResponse.ok().body(
                request.bodyToMono(NewOrderDTO.class)
                        .flatMapMany(newOrder -> userRepository.save(newOrder.getUser())
                                .map(user -> new Order(user.getId(), LocalDateTime.now(clock)))
                                .flatMapMany(order -> orderRepository.save(order)
                                        .flatMapMany(savedOrder -> Flux.fromIterable(newOrder.getItems())
                                                .map(orderItem -> new OrderItem(savedOrder.getId(), orderItem.getProductId(), orderItem.getAmount()))
                                                .flatMap(orderItemRepository::save)
                                        )
                                )
                        ), OrderItem.class)
                .onErrorResume(e -> ServerResponse.badRequest().build());

    }

    public Mono<ServerResponse> getAllOrders(ServerRequest request) {
        return ServerResponse.ok().body(
                orderRepository.findAll()
                        .zipWith(userRepository.findAll())
                        .map(tuple -> new OrderDTO(tuple.getT1().getId(), tuple.getT2(), tuple.getT1().getCreatedDate())), OrderDTO.class
        );
    }

    public Mono<ServerResponse> getOrderInformation(ServerRequest request) {
        return orderRepository.findById(Integer.parseInt(request.pathVariable("orderId")))
                .flatMapMany(order -> orderItemRepository.findAllByOrderId(order.getId()))
                .flatMap(orderItem -> productRepository.findById(orderItem.getId())
                        .map(product -> new OrderItemDTO(orderItem.getOrderId(), product, orderItem.getAmount()))
                )
                .collectList()
                .filter(list -> !list.isEmpty())
                .flatMap(orderItems -> ServerResponse.ok().bodyValue(orderItems))
                .switchIfEmpty(ServerResponse.notFound().build());
    }
}
