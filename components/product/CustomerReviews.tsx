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
  }\n\n  return (\n    <div className=\"bg-white\">\n      {/* Reviews Summary */}\n      <div className=\"border-b border-gray-200 pb-8 mb-8\">\n        <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-8\">\n          {/* Overall Rating */}\n          <div>\n            <div className=\"flex items-center space-x-4 mb-6\">\n              <div className=\"text-5xl font-bold text-gray-900\">{averageRating}</div>\n              <div>\n                {renderStars(Math.round(averageRating), 'lg')}\n                <p className=\"text-sm text-gray-600 mt-1\">\n                  Based on {totalReviews} reviews\n                </p>\n              </div>\n            </div>\n            \n            <Button \n              onClick={() => setShowReviewForm(true)}\n              className=\"w-full sm:w-auto\"\n            >\n              Write a Review\n            </Button>\n          </div>\n\n          {/* Rating Distribution */}\n          <div>\n            <h4 className=\"font-semibold text-gray-900 mb-4\">Rating Breakdown</h4>\n            <div className=\"space-y-3\">\n              {ratingDistribution.map((item) => (\n                <div key={item.stars} className=\"flex items-center space-x-3\">\n                  <div className=\"flex items-center space-x-1 w-16\">\n                    <span className=\"text-sm font-medium\">{item.stars}</span>\n                    <Star className=\"w-4 h-4 text-yellow-400 fill-current\" />\n                  </div>\n                  <div className=\"flex-1 bg-gray-200 rounded-full h-2\">\n                    <div \n                      className=\"bg-yellow-400 h-2 rounded-full\" \n                      style={{ width: `${item.percentage}%` }}\n                    />\n                  </div>\n                  <span className=\"text-sm text-gray-600 w-12\">{item.count}</span>\n                </div>\n              ))}\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Filters and Sorting */}\n      <div className=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6\">\n        <div className=\"flex items-center space-x-4\">\n          <div className=\"flex items-center space-x-2\">\n            <Filter size={16} className=\"text-gray-400\" />\n            <select\n              value={filterBy}\n              onChange={(e) => setFilterBy(e.target.value)}\n              className=\"border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500\"\n            >\n              <option value=\"all\">All Reviews</option>\n              <option value=\"verified\">Verified Only</option>\n              <option value=\"5-star\">5 Stars</option>\n              <option value=\"4-star\">4 Stars</option>\n              <option value=\"3-star\">3 Stars</option>\n              <option value=\"2-star\">2 Stars</option>\n              <option value=\"1-star\">1 Star</option>\n            </select>\n          </div>\n        </div>\n\n        <select\n          value={sortBy}\n          onChange={(e) => setSortBy(e.target.value)}\n          className=\"border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500\"\n        >\n          <option value=\"newest\">Newest First</option>\n          <option value=\"oldest\">Oldest First</option>\n          <option value=\"highest\">Highest Rating</option>\n          <option value=\"lowest\">Lowest Rating</option>\n          <option value=\"helpful\">Most Helpful</option>\n        </select>\n      </div>\n\n      {/* Reviews List */}\n      <div className=\"space-y-6\">\n        {filteredReviews.map((review) => (\n          <div key={review.id} className=\"border border-gray-200 rounded-xl p-6\">\n            <div className=\"flex items-start justify-between mb-4\">\n              <div className=\"flex items-center space-x-3\">\n                <div className=\"w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center\">\n                  {review.userAvatar ? (\n                    <img \n                      src={review.userAvatar} \n                      alt={review.userName}\n                      className=\"w-10 h-10 rounded-full object-cover\"\n                    />\n                  ) : (\n                    <User size={20} className=\"text-gray-500\" />\n                  )}\n                </div>\n                <div>\n                  <div className=\"flex items-center space-x-2\">\n                    <h5 className=\"font-semibold text-gray-900\">{review.userName}</h5>\n                    {review.verified && (\n                      <div className=\"flex items-center space-x-1 text-green-600\">\n                        <CheckCircle size={16} />\n                        <span className=\"text-xs font-medium\">Verified Purchase</span>\n                      </div>\n                    )}\n                  </div>\n                  <p className=\"text-sm text-gray-600\">{new Date(review.date).toLocaleDateString()}</p>\n                </div>\n              </div>\n              {renderStars(review.rating)}\n            </div>\n\n            <h4 className=\"font-semibold text-gray-900 mb-2\">{review.title}</h4>\n            <p className=\"text-gray-700 mb-4\">{review.content}</p>\n\n            {(review.size || review.color) && (\n              <div className=\"flex items-center space-x-4 mb-4 text-sm text-gray-600\">\n                {review.size && <span>Size: {review.size}</span>}\n                {review.color && <span>Color: {review.color}</span>}\n              </div>\n            )}\n\n            <div className=\"flex items-center space-x-4\">\n              <button className=\"flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors\">\n                <ThumbsUp size={16} />\n                <span>Helpful ({review.helpful})</span>\n              </button>\n              <button className=\"flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors\">\n                <ThumbsDown size={16} />\n                <span>Not Helpful ({review.notHelpful})</span>\n              </button>\n            </div>\n          </div>\n        ))}\n      </div>\n\n      {/* Review Form Modal */}\n      {showReviewForm && (\n        <div className=\"fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4\">\n          <div className=\"bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto\">\n            <div className=\"p-6\">\n              <h3 className=\"text-xl font-bold text-gray-900 mb-6\">Write a Review</h3>\n              \n              <form onSubmit={handleSubmitReview} className=\"space-y-6\">\n                {/* Rating */}\n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n                    Rating *\n                  </label>\n                  <div className=\"flex items-center space-x-2\">\n                    {[1, 2, 3, 4, 5].map((star) => (\n                      <button\n                        key={star}\n                        type=\"button\"\n                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}\n                        className=\"focus:outline-none\"\n                      >\n                        <Star\n                          className={`w-8 h-8 transition-colors ${\n                            star <= newReview.rating\n                              ? 'text-yellow-400 fill-current'\n                              : 'text-gray-300 hover:text-yellow-200'\n                          }`}\n                        />\n                      </button>\n                    ))}\n                  </div>\n                </div>\n\n                {/* Title */}\n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n                    Review Title *\n                  </label>\n                  <input\n                    type=\"text\"\n                    required\n                    value={newReview.title}\n                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}\n                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500\"\n                    placeholder=\"Summarize your experience\"\n                  />\n                </div>\n\n                {/* Content */}\n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n                    Review Content *\n                  </label>\n                  <textarea\n                    required\n                    rows={4}\n                    value={newReview.content}\n                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}\n                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500\"\n                    placeholder=\"Share your thoughts about this product\"\n                  />\n                </div>\n\n                {/* Size and Color */}\n                <div className=\"grid grid-cols-2 gap-4\">\n                  <div>\n                    <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n                      Size (Optional)\n                    </label>\n                    <input\n                      type=\"text\"\n                      value={newReview.size}\n                      onChange={(e) => setNewReview(prev => ({ ...prev, size: e.target.value }))}\n                      className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500\"\n                      placeholder=\"e.g., 9\"\n                    />\n                  </div>\n                  <div>\n                    <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n                      Color (Optional)\n                    </label>\n                    <input\n                      type=\"text\"\n                      value={newReview.color}\n                      onChange={(e) => setNewReview(prev => ({ ...prev, color: e.target.value }))}\n                      className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500\"\n                      placeholder=\"e.g., Black/White\"\n                    />\n                  </div>\n                </div>\n\n                {/* Actions */}\n                <div className=\"flex items-center justify-end space-x-4 pt-4\">\n                  <button\n                    type=\"button\"\n                    onClick={() => setShowReviewForm(false)}\n                    className=\"px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors\"\n                  >\n                    Cancel\n                  </button>\n                  <Button type=\"submit\">\n                    Submit Review\n                  </Button>\n                </div>\n              </form>\n            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}