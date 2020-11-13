package com.project.backend;

import com.project.backend.data.IBigDataDao;
import com.project.backend.data.SubmitEntry;
import com.project.backend.data.SubmitResult;
import com.project.backend.parsing.DataParserCSV;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/samples")
public class Controller {

    Logger logger = LoggerFactory.getLogger(Controller.class);

    @Autowired
    IBigDataDao bigDataDao;

    @GetMapping("/")
    public String getHello(){
        return "Hello !";
    }


    /** Samples */

    @GetMapping("/samples/all")
    public List<SubmitEntry> getAll(){
        return bigDataDao.retrieve();
    }


    @PostMapping("/upload") // //new annotation since 4.3
    @ResponseBody
    public String  singleFileUpload(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return "File is empty";

        }

        try (

                ByteArrayInputStream stream = new ByteArrayInputStream( file.getBytes());
                InputStreamReader streamReader = new InputStreamReader(stream, StandardCharsets.UTF_8);
                BufferedReader bufferedReader = new BufferedReader(streamReader);
        ){
            List<SubmitEntry> entries = DataParserCSV.parse(bufferedReader);
          //  entries.forEach(System.out::println);
            bigDataDao.submit(entries);


        } catch (IOException e) {
            e.printStackTrace();
        }

        return "OK";
    }


    @PostMapping(value="/samples/submitJson", consumes =  MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE )
    public SubmitResult submitJson(@RequestBody List<SubmitEntry>  entries){

        if (!CollectionUtils.isEmpty(entries)){
            entries.forEach(System.out::println);
        }

        return new SubmitResult();
    }






    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(Exception e) {

        logger.error("Error",e);

        return new ResponseEntity<>("Something bad just happened here. [Todo: improve] ", HttpStatus.BAD_REQUEST);

    }

}
