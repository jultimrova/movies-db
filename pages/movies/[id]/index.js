import {useRouter} from 'next/router';
import {deleteMovie, getMovieById} from '../../../actions';
import Link from "next/link";


const Movie = (props) => {
    const router = useRouter()
    const {id} = router.query
    const {movie} = props

    const handleDeleteMovie = id => {
        deleteMovie(id).then(() => {
            router.push('/')
        })
    }

    return (
        <div className='container'>
            <div className="jumbotron">
                <h1 className="display-4">{movie.name}</h1>
                <p className="lead">{movie.description}</p>
                <hr className="my-4"/>
                <p>{movie.genre}</p>
                <button className="btn btn-primary btn-lg mr-1"
                        href="#"
                        role="button">Show more
                </button>
                <button onClick={() => handleDeleteMovie(id)}
                        className="btn btn-danger btn-lg mr-1"
                        href="#"
                        role="button">Delete
                </button>
                <Link href='/movies/[id]/edit' as={`/movies/${id}/edit`}>
                    <button className="btn btn-warning btn-lg"
                            href="#"
                            role="button">Edit
                    </button>
                </Link>
            </div>
            <p className='desc-text'>{movie.longDesc}</p>
            <style>{`
            .desc-text {
                font-size: 20px
             }
            `}</style>
        </div>
    )
}

Movie.getInitialProps = async ({query}) => {
    const movie = await getMovieById(query.id)
    return {movie}
}

export default Movie