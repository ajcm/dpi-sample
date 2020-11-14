package com.project.backend;

import com.project.backend.bigdata.SubmitResult;
import com.project.backend.bigdata.domain.Sample;
import com.project.backend.bigdata.parsing.DataParserCSV;
import com.project.backend.bigdata.parsing.SubmitException;
import com.project.backend.bigdata.repository.SamplesRepository;
import lombok.extern.slf4j.Slf4j;
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

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/")
@Slf4j
public class SamplesController {

    @Autowired
    DataParserCSV dataParserCSV;

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

    /** DELETE: TODO Security */
    @DeleteMapping("/samples/all")
    public void deleteAll(){
        samplesRepository.deleteAll();
    }


    @GetMapping(path = "/samples/page")
    Page<Sample> findAllPage(
            @PageableDefault(page = 0, size = 20)
                                         Pageable pageable) {
        return samplesRepository.findAllPage(pageable);
    }

    @PostMapping("/samples/upload")
    @ResponseBody
    public ResponseEntity<SubmitResult>  upload(@RequestParam("file") MultipartFile file) throws SubmitException {

        if (file == null || file.isEmpty()) {
           throw new SubmitException(-1,"No data.");
        }

        SubmitResult result =  dataParserCSV.parseMultipartFile(file);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }




    @ExceptionHandler(SubmitException.class)
    public ResponseEntity<String> handleSubmitException(SubmitException e) {

        log.error("SubmitException",e);

        return new ResponseEntity<>("Error during upload, line " +  e.getLine()  + " : " +e.getMessage(), HttpStatus.BAD_REQUEST);

    }

}
