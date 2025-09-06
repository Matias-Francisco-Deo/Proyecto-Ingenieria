package com.reservo.modelo.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthInfoTests {
    AuthInfo jorgeInfo;

    @BeforeEach
    void setUp() {
        Usuario jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        jorgeInfo = new AuthInfo("7859df99-008e-45b3-8054-4db757470c8e", jorge);
    }

    @Test
    void laInfoContieneEmail() {
        assertEquals("jorge@yahoo.com.ar", jorgeInfo.getEmail());
    }

    @Test
    void laInfoContieneClave() {
        assertEquals("7859df99-008e-45b3-8054-4db757470c8e", jorgeInfo.getKey());
    }


}
