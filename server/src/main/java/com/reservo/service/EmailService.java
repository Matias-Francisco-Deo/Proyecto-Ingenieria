package com.reservo.service;

public interface EmailService {
    void sendSimpleEmail(String to, String subject, String message);
    void sendHTMLEmail(String to, String subject, String html);

}
