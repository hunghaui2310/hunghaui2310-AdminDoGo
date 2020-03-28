package com.doan.admin.service;

import com.doan.admin.dto.CommentDTO;

import java.util.List;

public interface CommentService {

    List<CommentDTO> getNotificationAdmin() throws Exception;
}
