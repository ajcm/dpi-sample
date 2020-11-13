package com.project.backend.theverybigdata;

import com.project.backend.data.IBigDataDao;
import com.project.backend.data.SubmitEntry;
import com.project.backend.data.SubmitResult;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.LinkedList;
import java.util.List;

@Service @ApplicationScope
public class MyVeryBigDataEngine implements IBigDataDao {


    private List<SubmitEntry> storage = new LinkedList<>();


    @Override
    public SubmitResult submit(List<SubmitEntry> entries) {
        storage.addAll(entries);

        return new SubmitResult();
    }

    @Override
    public List<SubmitEntry> retrieve() {
        return storage;
    }
}
