package com.module_data.DataController;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.module_data.DataService.DataService;

@RestController
@CrossOrigin
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataService dataService;
    
    @PostMapping("/getAll")
    public  ResponseEntity<?> getData(@RequestBody String query) {
    	Gson gson=new GsonBuilder().setPrettyPrinting().create();
    	String str=""; 
    	try {
    	List<Map<String, Object>> list=dataService.getAllData(query);
    	str=gson.toJson(list);
    	return ResponseEntity.status(HttpStatus.OK).body(list);
    	}
    	catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//    		return  new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    }
    	
}