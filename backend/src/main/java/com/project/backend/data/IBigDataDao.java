package com.project.backend.data;

import com.project.backend.domain.Sample;

import java.util.List;

public interface IBigDataDao {


    SubmitResult submit(List<Sample> entries);

    List<Sample> retrieve();


}
