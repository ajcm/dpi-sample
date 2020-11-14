package com.project.backend.theverybigdata;

import com.project.backend.data.IBigDataDao;
import com.project.backend.data.SubmitResult;
import com.project.backend.domain.Sample;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.LinkedList;
import java.util.List;

@Service @ApplicationScope
public class MyVeryBigDataEngine implements IBigDataDao {


    private List<Sample> storage = new LinkedList<>();


    @Override
    public SubmitResult submit(List<Sample> entries) {
        storage.addAll(entries);

        return new SubmitResult();
    }

    @Override
    public List<Sample> retrieve() {
        return storage;
    }
}
