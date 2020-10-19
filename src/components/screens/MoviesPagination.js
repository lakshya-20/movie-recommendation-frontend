import React, { useState,useEffect } from 'react';
import { Card, CardImg, CardImgOverlay,CardTitle,CardBody,CardText, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Styles/Pagination.css'

function RenderMovie ({movie}) {
    return (
        <Card>
            <Link to={`/movie/${movie._id}`} className="text-decoration-none">
                <CardImg width="100%" src={movie.poster} alt={movie.title} />
                {/* <CardImgOverlay>
                    <CardTitle><span className="badge-dark">{movie.title}</span></CardTitle>
                </CardImgOverlay> */}
                <CardBody className="text-dark">
                    <CardTitle className="font-weight-bold">{movie.title}</CardTitle>
                    <CardText>
                        {movie.genres}
                    </CardText>
                    
                </CardBody>
            </Link>
        </Card>
    );
}

function App(props) {
    const[movies_data,setMoviesData]=useState(props.movies_data)
    const [pagination, setPagination] = useState({
        data: props.movies_data,
        offset: 0,
        numberPerPage: 32,
        pageCount: 0,
        currentData: []
    });
    console.log("props"+props.movies_data.length)

    useEffect(() => {
        setPagination((prevState) => ({
        ...prevState,
        pageCount: movies_data.length / prevState.numberPerPage,
        currentData: movies_data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
    }, [pagination.numberPerPage, pagination.offset])


    const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Movies</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Movies</h3>
                    <hr />
                </div> 
            </div>
            <div className="row justify-content-center">
                {pagination.currentData && pagination.currentData.map(((item, index) => (
                    <div className="col-6 col-md-3  py-3"  key={item._id}>
                        <RenderMovie movie={item}  />
                    </div>
                )))
                }
            </div>
            
            <div id="react-paginate" className="row justify-content-center">
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={pagination.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        
        </div>
    );
}
export default App;