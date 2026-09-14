import React from 'react'

/**
 * StarRating.jsx
 * A reusable, premium star rating component.
 * Supports read-only display and interactive input mode.
 */
export default function StarRating({ rating = 0, count = null, size = 'md', onRate = null, editable = false }) {
  const stars = [1, 2, 3, 4, 5]
  const fullRating = Math.round(rating)

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return '16px'
      case 'lg': return '32px'
      default: return '22px'
    }
  }

  return (
    <div className={`star-rating-container ${editable ? 'editable' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div className="stars-row" style={{ display: 'flex', gap: '2px' }}>
        {stars.map((star) => (
          <svg
            key={star}
            width={getSizeClass()}
            height={getSizeClass()}
            viewBox="0 0 24 24"
            fill={star <= (editable ? rating : fullRating) ? '#236516' : '#ffffd5'}
            stroke={star <= (editable ? rating : fullRating) ? '#236516' : '#98ae83'}
            strokeWidth="1"
            style={{ cursor: editable ? 'pointer' : 'default', transition: 'all 0.2s ease' }}
            onClick={() => editable && onRate && onRate(star)}
            className="star-icon"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      {count !== null && (
        <span className="rating-text" style={{ fontSize: '0.95rem', color: '#236516', marginLeft: '8px', fontWeight: '900' }}>
          {typeof rating === 'number' ? rating.toFixed(1) : '0.0'} {count !== null && `(${count})`}
        </span>
      )}
    </div>
  )
}
