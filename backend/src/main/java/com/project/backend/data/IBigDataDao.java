package com.project.backend.data;

import java.util.List;

public interface IBigDataDao {


    SubmitResult submit(List<InputEntry> entries);

    List<InputEntry> retrieve();


}
