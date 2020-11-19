package com.project.backend;

import com.project.backend.bigdata.DataService;
import com.project.backend.bigdata.domain.SubmitException;
import com.project.backend.bigdata.domain.SubmitResult;
import com.project.backend.bigdata.repository.SamplesRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@SpringBootTest
public class DataServiceTest {

    @InjectMocks
    private DataService dataService;

    @Mock
    private SamplesRepository samplesRepository;

    @Test
    public void testParsing() {

        try {
            String initialString = "text";
            InputStream targetStream = new ByteArrayInputStream(initialString.getBytes());

            SubmitResult submitResult =  dataService.parse(targetStream);
            assertEquals(submitResult.getParsed() ,0);

            Resource entries = new ClassPathResource("device_performance_index.csv");
            submitResult =  dataService.parse(entries.getInputStream());
            assertEquals(submitResult.getParsed() ,65169);

        } catch (SubmitException | IOException e) {
            Assertions.fail(e);
        }

    }

}
