package com.project.backend.bigdata.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
public class SubmitException extends Exception {

    int line;
    String message;

    public SubmitException(Exception e){
        super(e);
    }

    public SubmitException(Exception e,int line, String message){
        super(e);

        setLine(line);
        setMessage(message);
    }

    public SubmitException(int line, String message){
        setLine(line);
        setMessage(message);
    }

}
