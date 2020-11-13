package com.project.backend.data;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class SubmitResult {

    int parsed = 0;
    int failed = 0;
    List<String> errors;

}
