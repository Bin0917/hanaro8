package com.hana8.demo.service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hana8.demo.dto.PostDTO;
import com.hana8.demo.dto.PostListDTO;
import com.hana8.demo.dto.ReplyDTO;
import com.hana8.demo.entity.Hashtag;
import com.hana8.demo.entity.Post;
import com.hana8.demo.entity.PostBody;
import com.hana8.demo.entity.QPost;
import com.hana8.demo.entity.Reply;
import com.hana8.demo.mapper.HashtagMapper;
import com.hana8.demo.mapper.PostMapper;
import com.hana8.demo.mapper.ReplyMapper;
import com.hana8.demo.repository.HashtagRepository;
import com.hana8.demo.repository.MemberRepository;
import com.hana8.demo.repository.PostRepository;
import com.hana8.demo.repository.ReplyRepository;
import com.querydsl.core.BooleanBuilder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	private final PostRepository repository;
	private final PostMapper mapper;
	private final ReplyRepository replyRepository;
	private final ReplyMapper replyMapper;
	private final MemberRepository memberRepository;
	private final HashtagRepository hashtagRepository;
	private final HashtagMapper hashtagMapper;

	public List<PostDTO> getPosts(PostListDTO dto) {
		Pageable pager = PageRequest.of(dto.getPage(), dto.getPageSize(), Sort.by("id").descending());

		QPost post = QPost.post;
		BooleanBuilder bb = new BooleanBuilder();

		// 어짜피 있어야 넣어주는거니까 한 서비스에 다 넣어줘도 됨
		if (StringUtils.hasText(dto.getTitle()))
			bb.and(post.title.contains(dto.getTitle()));

		if (StringUtils.hasText(dto.getBody()))
			bb.and(post.body.body.contains(dto.getBody())); // 포함만 되어있으면 될 때 contains

		if (StringUtils.hasText(dto.getWriter()))
			bb.and(post.writer.nickname.eq(dto.getWriter())); // 정확하게 맞아야 할때 eq

		if (StringUtils.hasText(dto.getWriteDate())) {
			ZoneId zoneId = ZoneId.of("Asia/Seoul");
			// LocalDateTime start = dto.parseWrtireDate().atStartOfDay();
			ZonedDateTime start = dto.parseWrtireDate().atStartOfDay(zoneId);
			// LocalDateTime epnd = dto.parseWrtireDate().atTime(LocalTime.MAX);// max = 59분 59초 9999...
			// LocalDateTime end = dto.parseWrtireDate().plusDays(1).atStartOfDay(); // 이쁘게 나온다!
			ZonedDateTime end = dto.parseWrtireDate().plusDays(1).atStartOfDay(zoneId);

			// bb.and(post.createdAt.between(start, end));
			bb.and(post.createdAt.goe(start.toLocalDateTime()).and(post.createdAt.lt(end.toLocalDateTime())));
		}

		List<Post> posts = repository.findAll(bb, pager).getContent();
		return posts.stream().map(mapper::toPostDTO).toList();
	}

	public PostDTO getPost(Long id) {
		Post post = repository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("there's no post!! with #%d".formatted(id)));

		PostDTO postDTO = mapper.toPostDTO(post);
		postDTO.setReplies(replyMapper.toReplyDTOList(replyRepository.findAllByPost(id)));
		return postDTO;
	}

	public PostDTO addPost(PostDTO post) {
		Post savedPost = repository.save(mapper.toEntity(post));

		// !!! 다시보기
		List<Hashtag> hashtags = post.getHashtags().stream().map(h -> {
			Hashtag hashtag = hashtagRepository.findByTag(h.getHashtag()).orElseGet(() ->
				hashtagRepository.save(new Hashtag(h.getHashtag())));
			hashtag.addPosts(savedPost);
			return hashtag;
		}).toList();

		// TODO logined usereid nees
		savedPost.setWriter(memberRepository.findById(post.getWriter().getId()).orElseThrow());
		PostBody postBody = mapper.toEntity(post.getBody());
		savedPost.setBody(postBody);

		PostDTO postDTO = mapper.toPostDTO(repository.save(savedPost));
		postDTO.setHashtags(hashtags.stream().map(hashtagMapper::toDTO).toList());
		return postDTO;
	}

	public PostDTO editPost(PostDTO postDTO) {
		// edit은 repo에서 현재 유저를 가져온 뒤, 내려보낸 DTO에 심어
		// 1. 새로운 객체 저장 + dto로 돌려보내주기 로 처리
		Post oldPost = repository.findById(postDTO.getId())
			.orElseThrow(() -> new IllegalArgumentException("Need id for edit"));

		oldPost.setTitle(postDTO.getTitle());
		oldPost.setBody(mapper.toEntity(postDTO.getBody()));
		// oldPost.setWriter(postDTO.getWriter());
		//
		// Dirty Checking 덕분에 save 안해도 되지만, 가독성을 위해 명시
		return mapper.toPostDTO(repository.save(oldPost));
	}

	public int removePost(Long id) {
		repository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("There's no Post about #%d".formatted(id)));
		repository.deletePost(id);
		return 1;
	}

	public List<ReplyDTO> getReplies(Long postId) {
		List<Reply> replies = replyRepository.findAllByPost(postId);
		return replyMapper.toReplyDTOList(replies);
	}

	public ReplyDTO getReply(Long id) {
		return replyMapper.toReplyDTO(replyRepository.findById(id).orElseThrow(() ->
			new IllegalArgumentException("Reply not found")));
	}

	public ReplyDTO addReply(ReplyDTO dto) {
		Post post = repository.findById(dto.getId()).orElseThrow();
		Reply reply = replyMapper.toEntity(dto);
		reply.setPost(post);
		reply.setReplier(memberRepository.findById(dto.getReplier().getId()).orElseThrow());

		return replyMapper.toReplyDTO(replyRepository.save(reply));
	}

	public ReplyDTO editReply(ReplyDTO dto) {
		Reply reply = replyRepository.findById(dto.getId())
			.orElseThrow(() -> new IllegalArgumentException("Reply not found"));
		reply.setReply(dto.getReply());
		return replyMapper.toReplyDTO(replyRepository.save(reply));
	}

	public int removeReply(Long id) {
		return replyRepository.deleteByReplyId(id);
	}
}
