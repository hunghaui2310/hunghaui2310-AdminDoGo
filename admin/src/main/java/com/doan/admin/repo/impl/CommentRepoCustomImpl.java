package com.doan.admin.repo.impl;

import com.doan.admin.repo.CommentRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

/*
 *   author: HungNN
 */

public class CommentRepoCustomImpl implements CommentRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> getCommentAdmin() throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("select c.*, u.full_name from `comment` c, `user` u" +
                " where u.id = c.user_id" +
                " order by id desc limit 3");
        Query query = entityManager.createNativeQuery(sql.toString());
        return query.getResultList();
    }
}
