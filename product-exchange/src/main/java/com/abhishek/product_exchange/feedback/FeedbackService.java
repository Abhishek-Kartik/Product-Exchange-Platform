package com.abhishek.product_exchange.feedback;


import com.abhishek.product_exchange.common.PageResponse;
import com.abhishek.product_exchange.exception.OperationNotPermittedException;
import com.abhishek.product_exchange.product.Product;
import com.abhishek.product_exchange.product.ProductRepository;
import com.abhishek.product_exchange.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final ProductRepository productRepository;
    private final FeedBackRepository feedBackRepository;
    private final FeedbackMapper feedbackMapper;

    public Long save(FeedbackRequest request, Authentication connectedUser) {
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new EntityNotFoundException("No product found with ID:: " + request.productId()));
        if (product.isArchived() || !product.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a feedback for and archived or not shareable product");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(product.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("You cannot give feedback to your own product");
        }
        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedBackRepository.save(feedback).getId();
    }



    public PageResponse<FeedbackResponse> findAllFeedbacksByBook(Long productId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedBackRepository.findAllByProductId(productId, pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedbackResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}
