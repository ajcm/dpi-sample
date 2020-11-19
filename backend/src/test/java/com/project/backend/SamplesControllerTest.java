package com.project.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SamplesControllerTest {

    @Test
    public void testHomeController() {
        SamplesController samplesController = new SamplesController();
        String result = samplesController.getHello();
        assertEquals(result, "Hello !");

    }
}
