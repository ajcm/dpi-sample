package com.project.backend;

import com.project.backend.domain.Sample;
import com.project.backend.parsing.DataParserCSV;
import com.project.backend.repository.SamplesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/")
public class Controller {

    Logger logger = LoggerFactory.getLogger(Controller.class);

//    @Autowired
//    IBigDataDao bigDataDao;

    @Autowired
    SamplesRepository samplesRepository;

    @GetMapping("/")
    public String getHello(){
        return "Hello !";
    }


    /** Samples */

    @GetMapping("/samples/all")
    public List<Sample> getAll(){

       // return samplesRepository.findAll().

        return new LinkedList<>();
    }

    @GetMapping(path = "/samples/page")
    Page<Sample> findAllPage(
            @PageableDefault(page = 0, size = 20)
                                         Pageable pageable) {
        return samplesRepository.findAllPage(pageable);
    }

    @PostMapping("/samples/upload")
    @ResponseBody
    public String  upload(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return "File is empty";
        }

        try (
                ByteArrayInputStream stream = new ByteArrayInputStream(file.getBytes());
                InputStreamReader streamReader = new InputStreamReader(stream, StandardCharsets.UTF_8);
                BufferedReader bufferedReader = new BufferedReader(streamReader);
        ){
            List<Sample> entries = DataParserCSV.parse(bufferedReader);
            /* TODO: Improve performance like executing Batch */
            samplesRepository.saveAll(entries);


        } catch (IOException e) {
            e.printStackTrace();
        }

        return "OK";
    }




    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(Exception e) {

        logger.error("Error",e);

        return new ResponseEntity<>("Something bad just happened here. [Todo: improve] ", HttpStatus.BAD_REQUEST);

    }

}
