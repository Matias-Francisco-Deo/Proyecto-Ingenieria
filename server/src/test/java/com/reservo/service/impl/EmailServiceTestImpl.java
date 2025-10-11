package com.reservo.service.impl;

import com.reservo.service.EmailService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("test")
@Service
public class EmailServiceTestImpl implements EmailService {
    @Override
    public void sendSimpleEmail(String to, String subject, String message) {

    }

    @Override
    public void sendHTMLEmail(String to, String subject, String html) {

    }
}
