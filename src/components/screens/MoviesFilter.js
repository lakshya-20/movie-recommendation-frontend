import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const MoviesFilter = ({updateSearchParam, filter_params}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        updateSearchParam(name, value, checked);
    }

    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), timeout);
        }
    }
    const processChange = debounce(updateSearchParam, 1000);
    return (
        <div>
            <>
            <span onClick={()=> setIsOpen(!isOpen)} type="button">
                <i class="fa fa-2x fa-filter"></i>                
            </span>
            <div className="search col-10 float-right">
                <div className="d-flex justify-content-center">
                    <input 
                        type="text" 
                        className="searchTerm" 
                        placeholder="Search By Title"
                        name="title"
                        id="searchTerm"
                        onChange={(e)=>processChange(e.target.name, e.target.value)}
                    />
                    <button type="submit" className="searchButton" onClick="">
                        {document.getElementById("searchTerm") && document.getElementById("searchTerm").value!=""?
                            <i className="fa fa-close" onClick={()=>{
                                processChange("title", "")
                                document.getElementById("searchTerm").value = ""
                            }}></i> 
                        :    
                            <i className="fa fa-search" onClick={()=>processChange("title", document.getElementById("searchTerm").value)}></i>                        
                        }                        
                    </button>
                </div>                
            </div>
            </>
            <Modal isOpen={isOpen} toggle={()=>{setIsOpen(!isOpen)}} className="modal-dialog-centered">
                <ModalHeader toggle={()=>{setIsOpen(!isOpen)}}>Filters</ModalHeader>
                <ModalBody>
                    {filter_params.genres && filter_params.genres.length>0?   //to check if filter exists
                        <>
                        <span>Genres</span>
                        <div className="form-check">
                            {filter_params.genres.map(genre => {
                                return (
                                    <div key={genre} className="form-check">
                                        <input className="form-check-input" type="checkbox" name="genres" value={genre} onChange={handleChange}/>
                                        <label className="form-check-label">{genre}</label>
                                    </div>
                                )
                            })}
                        </div>       
                        <span>Imdb Score {filter_params.imdb_score_range.min.toFixed(1)} - <span id="range_max">{filter_params.imdb_score_range.max.toFixed(1)}</span> </span>  
                        <div className="form-check d-flex justify-content-between">
                            {filter_params.imdb_score_range.min.toFixed(1)}
                            <input 
                                className="form-control-range" 
                                type="range" 
                                name="imdb_score" 
                                min={filter_params.imdb_score_range.min.toFixed(1)} 
                                max={filter_params.imdb_score_range.max.toFixed(1)} 
                                step={0.1}                               
                                onChange={
                                    (e) => {
                                        const { name, value } = e.target;
                                        document.getElementById('range_max').innerHTML = value;
                                        processChange(name, {min: filter_params.imdb_score_range.min, max: value})
                                    }
                                }
                            />                            
                            {filter_params.imdb_score_range.max.toFixed(1)}
                        </div>
                        </>
                    :
                        <span>No filters to show</span>
                    }

                </ModalBody>
            </Modal>
        </div>
    )
}

export default MoviesFilter;