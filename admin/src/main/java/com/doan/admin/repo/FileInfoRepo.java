package com.doan.admin.repo;

import com.doan.admin.model.FileInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileInfoRepo extends JpaRepository<FileInfo, Long> {
}
