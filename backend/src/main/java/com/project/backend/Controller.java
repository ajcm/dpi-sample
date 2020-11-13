package com.project.backend;

import com.project.backend.data.IBigDataDao;
import com.project.backend.data.InputEntry;
import com.project.backend.data.SubmitResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class Controller {

    @Autowired
    IBigDataDao bigDataDao;

    @GetMapping("/")
    public String getHello(){
        return "Hello !";
    }

    @GetMapping("/dpi")
    public String getHome(){
        return "dpi service listening !";
    }

    @GetMapping("/dpi/all")
    public List<InputEntry> getAll(){
        return bigDataDao.retrieve();
    }


    @PostMapping(value="/dpi/submitJson", consumes =  MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE )
    public SubmitResult submitJson(@RequestBody List<InputEntry>  entries){

        if (!CollectionUtils.isEmpty(entries)){
            entries.forEach(System.out::println);
        }

        return new SubmitResult();
    }






    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(Exception e) {

        e.printStackTrace();

        return new ResponseEntity<>("Something bad just happened here. [Todo: improve] ", HttpStatus.BAD_REQUEST);

    }

}
