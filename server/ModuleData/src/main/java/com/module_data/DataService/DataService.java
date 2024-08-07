package com.module_data.DataService;

import java.sql.SQLException;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.module_data.repository.DataRepository;

@Service
public class DataService {

    @Autowired
    private DataRepository dataRepository;

    public List<Map<String, Object>> getAllData(String query) throws Exception,SQLException{
       
        try {
        	List<Map<String, Object>> list= dataRepository.findAllData(query);
        	 return list;
    	}
        catch(Exception e) {
        	System.out.println(e);
        	throw new Exception(""+e.getCause(),e);
        }
    }

}