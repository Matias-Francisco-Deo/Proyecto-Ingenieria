package com.reservo.service.impl;

import com.reservo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Profile("!test")
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    private String email = "reservoapptmmj@gmail.com";

    @Override
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            sendEmail(to, subject, text);
        } catch (MailSendException e) {
            sendEmail(to,subject, text);
        }

    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(email);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
}
