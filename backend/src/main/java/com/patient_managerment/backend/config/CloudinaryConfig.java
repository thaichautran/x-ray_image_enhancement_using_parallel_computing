package com.patient_managerment.backend.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary getCloudinary(){
        Map<String, String> config = new HashMap();
        config.put("cloud_name", "dumtoifsu");
        config.put("api_key", "552394166332397");
        config.put("api_secret", "LLil8gmle2davcd6YfLlML7U-ww");
//        config.put("secure", true);
        return new Cloudinary(config);
    }
}



