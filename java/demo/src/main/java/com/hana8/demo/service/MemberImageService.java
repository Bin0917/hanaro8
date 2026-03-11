package com.hana8.demo.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

import com.hana8.demo.entity.Member;
import com.hana8.demo.entity.MemberImage;
import com.hana8.demo.repository.MemberImageRepository;
import com.hana8.demo.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberImageService {
	private final MemberImageRepository memberImageRepository;
	private final MemberRepository memberRepository;
	@Value("${upload.path}")
	private String uploadPath;

	@Value("${upload.secure}")
	private String secureUploadPath;

	// public String upload(MultipartFile file) {
	// 	return upload(file, false);
	// }
	//
	// public String upload(MultipartFile file, ) {
	// 	return upload(file, false);
	// }

	public String upload(MultipartFile file, Long memberId) {
		return upload(file, false, memberId);
	}

	private Path getTodayPath(String basePath) {
		LocalDateTime now = LocalDateTime.now();
		String path = String.format("%4d/%02d/%02d", now.getYear(),
			now.getMonthValue(), now.getDayOfMonth());

		return Paths.get(basePath, path);
	}

	public String upload(MultipartFile file, boolean isSecure, Long memberId) {
		if (file.isEmpty())
			throw new IllegalArgumentException("파일이 비어있습니다.");

		MemberImage memberImage = new MemberImage();
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("멤버 없음 "));
		memberImage.setMember(member);

		// 원본 파일명
		String originalFilename = file.getOriginalFilename();
		memberImage.setOrgname(originalFilename);

		// 확장자 추출
		String ext = originalFilename.substring(
			originalFilename.lastIndexOf("."));

		// UUID로 파일명 중복 방지
		String savedFilename = UUID.randomUUID() + ext;
		memberImage.setSavedname(savedFilename);

		// 저장 경로
		String basePath = isSecure ? secureUploadPath : uploadPath;
		Path todayPath = getTodayPath(basePath);
		Path savePath = todayPath.resolve(savedFilename);
		// 경로저장 (full 경로 파일이름빼고)
		memberImage.setSavedir(todayPath.toString());

		// Path thumbPath = Paths.get(uploadPath, "thumb_" + savedFilename);
		Path thumbPath = todayPath.resolve("thumb_" + savedFilename);
		try {
			// 디렉토리 없으면 생성, s를 붙여야함
			Files.createDirectories(savePath.getParent());

			// 파일 저장
			file.transferTo(savePath);

			String contentType = file.getContentType();
			if (contentType != null && contentType.startsWith("image/")) {
				Thumbnails.of(savePath.toFile())
					.size(200, 200)
					.crop(Positions.CENTER)
					.outputQuality(0.8)
					.toFile(thumbPath.toFile());
			}

			memberImageRepository.save(memberImage);
		} catch (IOException e) {
			throw new RuntimeException("파일 저장 실패", e);
		}
		return savedFilename;
	}

	// 다운로드는 이미지를 가져와, 해당 이미지의 주소로 접근해서
	public ResponseEntity<Resource> download(String filename, boolean inline, boolean isSecure) {
		MemberImage memberImage = memberImageRepository.findBySavedname(filename);

		if (memberImage == null) {
			throw new NoSuchElementException("DB에서 파일 정보를 찾을 수 없습니다: " + filename);
		}

		// 경로와 파일명을 안전하게 합쳐요!
		Path filePath = Paths.get(memberImage.getSavedir()).resolve(filename);
		Resource resource = new FileSystemResource(filePath);

		if (!resource.exists())
			throw new NoSuchElementException("물리적 파일을 찾을 수 없습니다: " + filename);

		// Content-Type 자동 감지
		String contentType;
		try {
			contentType = Files.probeContentType(filePath);
		} catch (IOException e) {
			contentType = "application/octet-stream";
		}  // 모르면 기본값

		// attachment - 저장 바로하는것
		String disposition = (inline ? "inline" : "attachment") + "; filename=\"" + filename + "\"";
		return ResponseEntity.ok()
			.contentType(MediaType.parseMediaType(contentType))
			.header(HttpHeaders.CONTENT_DISPOSITION, disposition)
			.body(resource);
	}
}
