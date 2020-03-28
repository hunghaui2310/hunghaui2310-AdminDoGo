package com.doan.admin.service.impl;

import com.doan.admin.dto.CommentDTO;
import com.doan.admin.helper.DataUtil;
import com.doan.admin.repo.CommentRepo;
import com.doan.admin.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
 *   author: HungNN
 */

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepo commentRepo;


    @Override
    public List<CommentDTO> getNotificationAdmin() throws Exception {
        List<Object[]> list = commentRepo.getCommentAdmin();
        List<CommentDTO> commentList = new ArrayList<>();
        for(Object[] objects : list) {
            CommentDTO comment = new CommentDTO();
            comment.setId(DataUtil.safeToLong(objects[0]));
            comment.setUserId(DataUtil.safeToLong(objects[1]));
            Long productId = DataUtil.safeToLong(objects[2]);
            if(productId != 0){
                comment.setProductId(productId);
            }
            Long blogId = DataUtil.safeToLong(objects[3]);
            if(blogId != 0){
                comment.setBlogId(blogId);
            }
            comment.setContent(DataUtil.safeToString(objects[4]));
            comment.setStatus(DataUtil.safeToInt(objects[5]));
            Date date = (Date) objects[6];
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd MMMM yyyy");
            comment.setCreateDate(simpleDateFormat.format(date));
            comment.setUserName(DataUtil.safeToString(objects[7]));
            commentList.add(comment);
        }
        return commentList;
    }
}
