'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, User, CheckCircle, Filter } from 'lucide-react'
import { Button } from '../ui/Button'

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  notHelpful: number
  size?: string
  color?: string
  images?: string[]
}

interface ReviewsProps {
  productId: string
  reviews: Review[]
  averageRating: number
  totalReviews: number
  onSubmitReview?: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'helpful' | 'notHelpful'>) => void
}

const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 5,
    title: 'Amazing quality and comfort!',
    content: 'These sneakers exceeded my expectations. The build quality is excellent and they are incredibly comfortable for all-day wear. Definitely worth the price!',
    date: '2024-01-15',
    verified: true,
    helpful: 12,
    notHelpful: 1,
    size: '9',
    color: 'Black/White'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Sarah M.',
    rating: 4,
    title: 'Great shoes, fast delivery',
    content: 'Love the style and fit. Delivery was super quick. Only minor issue is they run slightly small, so consider sizing up.',
    date: '2024-01-10',
    verified: true,
    helpful: 8,
    notHelpful: 0,
    size: '8',
    color: 'White'
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Mike K.',
    rating: 3,
    title: 'Good but not great',
    content: 'Decent quality for the price. The design is nice but I expected better materials. Still comfortable though.',
    date: '2024-01-05',
    verified: false,
    helpful: 3,
    notHelpful: 2,
    size: '10',
    color: 'Black'
  }
]

export function CustomerReviews({ 
  productId, 
  reviews = mockReviews, 
  averageRating = 4.2, 
  totalReviews = 24,
  onSubmitReview 
}: ReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    size: '',
    color: '',
    verified: false
  })

  const ratingDistribution = [
    { stars: 5, count: 12, percentage: 50 },
    { stars: 4, count: 8, percentage: 33 },
    { stars: 3, count: 3, percentage: 13 },
    { stars: 2, count: 1, percentage: 4 },
    { stars: 1, count: 0, percentage: 0 }
  ]

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const filteredReviews = sortedReviews.filter(review => {
    if (filterBy === 'all') return true
    if (filterBy === 'verified') return review.verified
    if (filterBy === '5-star') return review.rating === 5
    if (filterBy === '4-star') return review.rating === 4
    if (filterBy === '3-star') return review.rating === 3
    if (filterBy === '2-star') return review.rating === 2
    if (filterBy === '1-star') return review.rating === 1
    return true
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmitReview) {
      onSubmitReview(newReview)
      setNewReview({
        rating: 5,
        title: '',
        content: '',
        size: '',
        color: '',
        verified: false
      })
      setShowReviewForm(false)
    }
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Reviews Summary */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-5xl font-bold text-gray-900">{averageRating}</div>
              <div>
                {renderStars(Math.round(averageRating), 'lg')}
                <p className="text-sm text-gray-600 mt-1">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowReviewForm(true)}
              className="w-full sm:w-auto"
            >
              Write a Review
            </Button>
          </div>

          {/* Rating Distribution */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h4>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{item.stars}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Reviews</option>
              <option value="verified">Verified Only</option>
              <option value="5-star">5 Stars</option>
              <option value="4-star">4 Stars</option>
              <option value="3-star">3 Stars</option>
              <option value="2-star">2 Stars</option>
              <option value="1-star">1 Star</option>
            </select>
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {review.userAvatar ? (
                    <img 
                      src={review.userAvatar} 
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold text-gray-900">{review.userName}</h5>
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle size={16} />
                        <span className="text-xs font-medium">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>

            {(review.size || review.color) && (
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                {review.size && <span>Size: {review.size}</span>}
                {review.color && <span>Color: {review.color}</span>}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <ThumbsUp size={16} />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <ThumbsDown size={16} />
                <span>Not Helpful ({review.notHelpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= newReview.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Summarize your experience"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Content *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Share your thoughts about this product"
                  />
                </div>

                {/* Size and Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size (Optional)
                    </label>
                    <input
                      type="text"
                      value={newReview.size}
                      onChange={(e) => setNewReview(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., 9"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color (Optional)
                    </label>
                    <input
                      type="text"
                      value={newReview.color}
                      onChange={(e) => setNewReview(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Black/White"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button type="submit">
                    Submit Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}