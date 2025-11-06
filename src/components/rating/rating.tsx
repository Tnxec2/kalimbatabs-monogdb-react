import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useMemo } from 'react'
import styles from './rating.module.css'

type Props = {
    title: string,
    rating?: number,
    onChange?: (rating: number) => void
}

const toolTips = [
    'unknown',
    'beginner',
    'intermediate',
    'advanced',
]

export const Rating : FC<Props> = ({title, rating, onChange}) => {


    const stars = useMemo(() => 
    { 
        const onClickStar = (id: number) => {
            if (onChange) onChange(id)
        }

        const result = []
        for(let r = 0; r < 3; r++) {
            result.push(
            <FontAwesomeIcon key={'rating-'+r} icon={faStar} className={`${rating && rating > r ? styles.rating__checked : ''}`} onClick={() => onClickStar(r+1)} />)
        }
        return result
    }, [rating, onChange]
    )

    return (
        <span title={toolTips[rating || 0]} className={styles.rating__box} >
            {title}
            {stars}
      </span>
    )
}