package com.project.backend.data;

import java.util.List;

public interface IBigDataDao {


    SubmitResult submit(List<SubmitEntry> entries);

    List<SubmitEntry> retrieve();


}
