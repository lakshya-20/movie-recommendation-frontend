import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import styles from './Styles/MovieCard.module.css';
const MovieCard = ({movie}) => {
    return ( 
        <Card className={styles.movie_card}>
            <Link to={`/movie/${movie._id}`} className={styles.movie_card_link}>
                <CardImg width="100%" src={movie.poster} alt={movie.title} />
                <CardBody>
                    <CardTitle className="font-weight-bold">{movie.title}</CardTitle>
                    <CardText>
                        {movie.genres}
                    </CardText>
                </CardBody>
            </Link>
        </Card>
     );
}
 
export default MovieCard;