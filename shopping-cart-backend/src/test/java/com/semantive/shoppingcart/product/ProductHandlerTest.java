package com.semantive.shoppingcart.product;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.data.r2dbc.DataR2dbcTest;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.data.r2dbc.core.DatabaseClient;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Collections;

import static org.mockito.BDDMockito.given;

@WebFluxTest
@ContextConfiguration(classes = {ProductRouterConfiguration.class, ProductHandler.class})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ProductHandlerTest {
    @MockBean
    private ProductRepository productRepository;

    private WebTestClient webTestClient;

    @BeforeEach
    void setUp(@Autowired WebTestClient webTestClient) {
        this.webTestClient = webTestClient;
    }

    @DisplayName("ProductHandler: getAllProducts")
    @Test
    void whenGetAllProducts_thenReturnStatusOK_andReturnBodyResultFromRepository() {
        //given
        Product product = new Product("BLACK","XXL",3);
        given(productRepository.findAll()).willReturn(Flux.just(product));

        //when
        var response = webTestClient.get()
                .uri("/api/products")
                .exchange();

        //then
        response.expectStatus().isOk()
                .expectBodyList(Product.class).hasSize(1).isEqualTo(Collections.singletonList(product));

    }
}