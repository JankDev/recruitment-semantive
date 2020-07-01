package com.semantive.shoppingcart.order;

import com.semantive.shoppingcart.order.dtos.NewOrderDTO;
import com.semantive.shoppingcart.order.dtos.OrderDTO;
import com.semantive.shoppingcart.order.dtos.OrderItemDTO;
import com.semantive.shoppingcart.product.Product;
import com.semantive.shoppingcart.product.ProductRepository;
import com.semantive.shoppingcart.user.User;
import com.semantive.shoppingcart.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Hooks;
import reactor.core.publisher.Mono;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;

@WebFluxTest
@ContextConfiguration(classes = {OrderHandler.class, OrderRoutingConfiguration.class})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class OrderHandlerTest {
    @MockBean
    private OrderRepository orderRepository;
    @MockBean
    private OrderItemRepository orderItemRepository;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private ProductRepository productRepository;

    private WebTestClient webTestClient;

    private final Clock clock = Clock.fixed(Instant.now(), ZoneId.systemDefault());

    @BeforeEach
    void setUp(@Autowired WebTestClient webTestClient, @Autowired OrderHandler orderHandler) {
        this.webTestClient = webTestClient;
        orderHandler.setClock(clock);
    }

    @Test
    void sendOrderShouldInvokeMethodsOnAllRepositoriesAndReturnTheListOfSavedItems() {
        Hooks.onOperatorDebug();
        //given
        var product = new Product("WHITE", "XL", 1);
        product.setId(1);
        var user = new User("Alfred Bateman", (short) 72);
        var orderItem = new OrderItem(product.getId(), 1);
        var newOrderDTO = new NewOrderDTO(user, Collections.singletonList(orderItem));
        var order = new Order(user.withId(1).getId(), LocalDateTime.now(clock));

        given(userRepository.save(any(User.class))).willReturn(Mono.just(user.withId(1)));
        given(orderRepository.save(any(Order.class))).willReturn(Mono.just(order.withId(1)));
        given(orderItemRepository.save(any(OrderItem.class))).willReturn(Mono.just(orderItem.withOrderId(1)));

        //when
        var response = webTestClient.post()
                .uri("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(newOrderDTO)
                .exchange();

        //then
        response
                .expectStatus().isOk()
                .expectBodyList(OrderItem.class).hasSize(1);
        Mockito.verify(orderItemRepository, times(1)).save(orderItem.withOrderId(1));
        Mockito.verify(orderRepository, times(1)).save(order);
        Mockito.verify(userRepository, times(1)).save(user);
    }

    @Test
    void getAllOrdersShouldReturnAListOfOrderDTOCombinedOfUsersAndOrders() {
        //given
        var order = new Order(1, 1, LocalDateTime.now(clock));
        var user = new User(1, "Robert", (short) 20);
        given(orderRepository.findAll()).willReturn(Flux.just(order));
        given(userRepository.findAll()).willReturn(Flux.just(user));

        //when
        var response = webTestClient.get()
                .uri("/api/orders")
                .exchange();

        //then
        var expectedOrderDTO = new OrderDTO(order.getId(), user, order.getCreatedDate());
        response.expectStatus().isOk()
                .expectBodyList(OrderDTO.class).hasSize(1).contains(expectedOrderDTO);
    }

    @Test
    void getOrderInformationShouldReturnStatusNotFoundIfTheGivenOrderDoesNotExist() {
        //given
        given(orderRepository.findById(anyInt())).willReturn(Mono.empty());

        //when
        var response = webTestClient.get()
                .uri("/api/orders/{orderId}", 1)
                .exchange();

        //then
        response.expectStatus().isNotFound();
    }

    @Test
    void getOrderInformationShouldReturnStatusOKAndAllOrderItemsAssociatedWithAGivenOrderId() {
        //given
        var order = new Order(1, 1, LocalDateTime.now(clock));
        var product = new Product("white", "xxl", 2);
        product.setId(1);
        var orderItem = new OrderItem(1, order.getId(), product.getId(), 2);
        given(orderRepository.findById(anyInt())).willReturn(Mono.just(order));
        given(orderItemRepository.findAllByOrderId(order.getId())).willReturn(Flux.just(orderItem));
        given(productRepository.findById(anyInt())).willReturn(Mono.just(product));

        //when
        var response = webTestClient.get()
                .uri("/api/orders/{orderId}", 2)
                .exchange();

        //then
        var result = new OrderItemDTO(order.getId(),product,orderItem.getAmount());
        response.expectStatus().isOk()
                .expectBodyList(OrderItemDTO.class).hasSize(1).contains(result);
    }
}