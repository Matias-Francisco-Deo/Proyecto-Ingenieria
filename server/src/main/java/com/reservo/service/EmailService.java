package com.reservo.service;

public interface EmailService {
    void sendSimpleEmail(String to, String subject, String message);

}
